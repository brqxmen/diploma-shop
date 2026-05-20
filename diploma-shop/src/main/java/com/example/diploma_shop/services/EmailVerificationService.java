package com.example.diploma_shop.services;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailVerificationService {

    private static final int CODE_TTL_MINUTES = 10;

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final SecureRandom secureRandom = new SecureRandom();
    private final Map<String, VerificationCode> codes = new ConcurrentHashMap<>();

    @Value("${spring.mail.host:}")
    private String mailHost;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${app.mail.dev-mode:true}")
    private boolean devMode;

    public EmailVerificationService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    public VerificationResult sendCode(String email) {
        String normalizedEmail = normalize(email);
        String code = String.format("%06d", secureRandom.nextInt(1_000_000));

        codes.put(normalizedEmail, new VerificationCode(code, LocalDateTime.now().plusMinutes(CODE_TTL_MINUTES)));

        boolean sent = sendEmail(normalizedEmail, code);
        String devCode = devMode || !sent ? code : null;

        return new VerificationResult(sent, devCode, CODE_TTL_MINUTES);
    }

    public boolean verify(String email, String code) {
        if (!StringUtils.hasText(email) || !StringUtils.hasText(code)) {
            return false;
        }

        String normalizedEmail = normalize(email);
        VerificationCode savedCode = codes.get(normalizedEmail);

        if (savedCode == null || savedCode.expiresAt().isBefore(LocalDateTime.now())) {
            codes.remove(normalizedEmail);
            return false;
        }

        boolean verified = savedCode.code().equals(code.trim());
        if (verified) {
            codes.remove(normalizedEmail);
        }

        return verified;
    }

    private boolean sendEmail(String email, String code) {
        if (!StringUtils.hasText(mailHost)) {
            return false;
        }

        try {
            JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
            if (mailSender == null) {
                return false;
            }

            SimpleMailMessage message = new SimpleMailMessage();
            if (StringUtils.hasText(mailUsername)) {
                message.setFrom(mailUsername);
            }
            message.setTo(email);
            message.setSubject("Street 19 verification code");
            message.setText("""
                    Your Street 19 verification code is:

                    %s

                    The code is valid for %d minutes.
                    """.formatted(code, CODE_TTL_MINUTES));

            mailSender.send(message);
            return true;
        } catch (Exception ignored) {
            return false;
        }
    }

    private String normalize(String email) {
        return email.trim().toLowerCase();
    }

    private record VerificationCode(String code, LocalDateTime expiresAt) {
    }

    public record VerificationResult(boolean sent, String devCode, int expiresInMinutes) {
    }
}

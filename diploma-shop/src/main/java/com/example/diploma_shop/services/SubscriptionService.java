package com.example.diploma_shop.services;

import com.example.diploma_shop.module.Subscriber;
import com.example.diploma_shop.repositories.SubscriberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class SubscriptionService {

    private final SubscriberRepository subscriberRepository;

    public SubscriptionService(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @Transactional
    public ResponseEntity<Map<String, String>> subscribe(String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email не может быть пустым"));
        }

        if (subscriberRepository.existsByEmail(email)) {
            return ResponseEntity.ok(Map.of("message", "Этот email уже подписан"));
        }

        Subscriber subscriber = new Subscriber();
        subscriber.setEmail(email);
        subscriberRepository.save(subscriber);

        return ResponseEntity.ok(Map.of("message", "Спасибо за подписку!"));
    }
}

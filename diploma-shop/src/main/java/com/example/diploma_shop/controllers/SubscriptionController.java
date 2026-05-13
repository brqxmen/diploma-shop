package com.example.diploma_shop.controllers;

import com.example.diploma_shop.module.Subscriber;
import com.example.diploma_shop.repositories.SubscriberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class SubscriptionController {

    private final SubscriberRepository subscriberRepository;

    public SubscriptionController(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @PostMapping("/api/subscribe")
    @Transactional
    public ResponseEntity<?> subscribe(@RequestParam String email) {
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

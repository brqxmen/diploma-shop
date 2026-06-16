package com.example.diploma_shop.controllers;

import com.example.diploma_shop.services.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/api/subscribe")
    public ResponseEntity<?> subscribe(@RequestParam String email) {
        return subscriptionService.subscribe(email);
    }
}

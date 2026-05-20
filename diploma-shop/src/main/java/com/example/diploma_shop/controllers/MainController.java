package com.example.diploma_shop.controllers;

import com.example.diploma_shop.module.Subscriber;
import com.example.diploma_shop.repositories.SubscriberRepository;
import com.example.diploma_shop.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class MainController {

    @Autowired
    private SubscriberRepository subscriberRepository;

    @Autowired
    private EventService eventService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/culture")
    public String culture() {
        return "culture";
    }

    @GetMapping("/learn")
    public String learn() {
        return "learn";
    }

    @GetMapping("/events")
    public String events(Model model) {
        model.addAttribute("comingEvents", eventService.getComingEvents());
        model.addAttribute("archiveEvents", eventService.getArchiveEvents());
        return "events";
    }

    @PostMapping("/subscribe")
    @ResponseBody
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

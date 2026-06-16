package com.example.diploma_shop.controllers;

import com.example.diploma_shop.services.EventService;
import com.example.diploma_shop.services.SubscriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    private final EventService eventService;
    private final SubscriptionService subscriptionService;

    public MainController(EventService eventService, SubscriptionService subscriptionService) {
        this.eventService = eventService;
        this.subscriptionService = subscriptionService;
    }

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
        return subscriptionService.subscribe(email);
    }
}

package com.example.diploma_shop.controllers;

import com.example.diploma_shop.module.Events;
import com.example.diploma_shop.module.Product;
import com.example.diploma_shop.repositories.CustomerProfileRepository;
import com.example.diploma_shop.repositories.EventRepository;
import com.example.diploma_shop.repositories.ProductRepository;
import com.example.diploma_shop.repositories.SubscriberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final ProductRepository productRepository;
    private final EventRepository eventRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final SubscriberRepository subscriberRepository;

    public AdminController(ProductRepository productRepository,
                           EventRepository eventRepository,
                           CustomerProfileRepository customerProfileRepository,
                           SubscriberRepository subscriberRepository) {
        this.productRepository = productRepository;
        this.eventRepository = eventRepository;
        this.customerProfileRepository = customerProfileRepository;
        this.subscriberRepository = subscriberRepository;
    }

    @GetMapping({"", "/"})
    public String dashboard(Model model) {
        model.addAttribute("totalProducts", productRepository.count());
        model.addAttribute("totalEvents",   eventRepository.count());
        model.addAttribute("totalClients",  customerProfileRepository.count());
        model.addAttribute("totalSubscribers", subscriberRepository.count());
        model.addAttribute("comingEvents",  eventRepository
                .findByEventDateGreaterThanEqualOrderByEventDateAsc(LocalDateTime.now()).size());
        model.addAttribute("archiveEvents", eventRepository
                .findByEventDateLessThanOrderByEventDateDesc(LocalDateTime.now()).size());
        return "admin/dashboard";
    }

    @GetMapping("/products")
    public String products(Model model) {
        model.addAttribute("products", productRepository.findAll());
        return "admin/products";
    }

    @PostMapping("/products/save")
    @ResponseBody
    public ResponseEntity<?> saveProduct(@RequestBody Product product) {
        productRepository.save(product);
        return ResponseEntity.ok(Map.of("message", "Saved"));
    }

    @DeleteMapping("/products/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    @GetMapping("/events")
    public String events(Model model) {
        model.addAttribute("events", eventRepository.findAll());
        return "admin/events";
    }

    @PostMapping("/events/save")
    @ResponseBody
    public ResponseEntity<?> saveEvent(@RequestBody Events event) {
        eventRepository.save(event);
        return ResponseEntity.ok(Map.of("message", "Saved"));
    }

    @DeleteMapping("/events/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    @GetMapping("/clients")
    public String clients(Model model) {
        model.addAttribute("clients", customerProfileRepository.findAll());
        return "admin/clients";
    }

    @GetMapping("/orders")
    public String orders() {
        return "admin/orders";
    }

    @GetMapping("/subscribers")
    public String subscribers(Model model) {
        model.addAttribute("subscribers", subscriberRepository.findAll());
        return "admin/subscribers";
    }
}

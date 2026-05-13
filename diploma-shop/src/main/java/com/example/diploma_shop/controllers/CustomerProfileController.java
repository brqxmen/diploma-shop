package com.example.diploma_shop.controllers;

import com.example.diploma_shop.module.CustomerProfile;
import com.example.diploma_shop.services.CustomerProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class CustomerProfileController {

    private final CustomerProfileService customerProfileService;

    public CustomerProfileController(CustomerProfileService customerProfileService) {
        this.customerProfileService = customerProfileService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody ProfileRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        return ResponseEntity.ok(customerProfileService.register(
                request.getEmail().trim(),
                request.getEmailOffers()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        CustomerProfile profile = customerProfileService.getById(id);
        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profile);
    }

    @GetMapping
    public ResponseEntity<?> getByEmail(@RequestParam String email) {
        CustomerProfile profile = customerProfileService.getByEmail(email);
        if (profile == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProfileRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        return ResponseEntity.ok(customerProfileService.update(
                id,
                request.getFirstName(),
                request.getLastName(),
                request.getEmail().trim(),
                request.getEmailOffers(),
                request.getAddress()
        ));
    }

    public static class ProfileRequest {
        private String firstName;
        private String lastName;
        private String email;
        private Boolean emailOffers;
        private String address;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Boolean getEmailOffers() {
            return emailOffers;
        }

        public void setEmailOffers(Boolean emailOffers) {
            this.emailOffers = emailOffers;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }
}

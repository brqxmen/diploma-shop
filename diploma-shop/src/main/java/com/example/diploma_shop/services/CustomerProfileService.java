package com.example.diploma_shop.services;

import com.example.diploma_shop.module.CustomerProfile;
import com.example.diploma_shop.repositories.CustomerProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerProfileService {

    private final CustomerProfileRepository customerProfileRepository;

    public CustomerProfileService(CustomerProfileRepository customerProfileRepository) {
        this.customerProfileRepository = customerProfileRepository;
    }

    public CustomerProfile register(String email, Boolean emailOffers) {
        CustomerProfile profile = customerProfileRepository.findByEmailIgnoreCase(email)
                .orElseGet(CustomerProfile::new);

        profile.setEmail(email);
        profile.setEmailOffers(Boolean.TRUE.equals(emailOffers));

        return customerProfileRepository.save(profile);
    }

    public CustomerProfile getById(Long id) {
        return customerProfileRepository.findById(id).orElse(null);
    }

    public CustomerProfile getByEmail(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }

        return customerProfileRepository.findByEmailIgnoreCase(email).orElse(null);
    }

    public CustomerProfile update(Long id, String firstName, String lastName, String email,
                                  Boolean emailOffers, String address) {
        CustomerProfile profile = customerProfileRepository.findById(id)
                .orElseGet(CustomerProfile::new);

        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setEmail(email);
        profile.setEmailOffers(Boolean.TRUE.equals(emailOffers));
        profile.setAddress(address);

        return customerProfileRepository.save(profile);
    }
}

package com.example.diploma_shop.repositories;

import com.example.diploma_shop.module.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerProfileRepository extends JpaRepository<CustomerProfile, Long> {
    Optional<CustomerProfile> findByEmailIgnoreCase(String email);
}

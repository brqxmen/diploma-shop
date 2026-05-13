package com.example.diploma_shop.repositories;

import com.example.diploma_shop.module.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {
    boolean existsByEmail(String email);
}

package com.example.diploma_shop.module;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscribers")
@Data
public class Subscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "subscribed_at")
    private LocalDateTime subscribedAt = LocalDateTime.now();
}

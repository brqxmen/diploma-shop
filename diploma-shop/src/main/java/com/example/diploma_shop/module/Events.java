package com.example.diploma_shop.module;

import jakarta.persistence.*; // Проверь, что импорт именно такой
import lombok.Data;

@Entity
@Table(name = "events") // Явно укажем имя таблицы
@Data
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
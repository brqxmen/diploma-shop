package com.example.diploma_shop.repositories;

import com.example.diploma_shop.module.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Events, Long> {

    // Будущие события (дата >= сейчас), сортировка по возрастанию
    List<Events> findByEventDateGreaterThanEqualOrderByEventDateAsc(LocalDateTime dateTime);

    // Архивные события (дата < сейчас), сортировка по убыванию
    List<Events> findByEventDateLessThanOrderByEventDateDesc(LocalDateTime dateTime);
}

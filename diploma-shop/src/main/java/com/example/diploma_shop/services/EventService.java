package com.example.diploma_shop.services;

import com.example.diploma_shop.module.Events;
import com.example.diploma_shop.repositories.EventRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Events> getComingEvents() {
        return eventRepository.findByEventDateGreaterThanEqualOrderByEventDateAsc(LocalDateTime.now());
    }

    public List<Events> getArchiveEvents() {
        return eventRepository.findByEventDateLessThanOrderByEventDateDesc(LocalDateTime.now());
    }

    @Scheduled(cron = "0 0 * * * *")
    public void logArchivedEvents() {
        long count = getArchiveEvents().size();
        System.out.println("[EventService] Archived events count: " + count);
    }
}

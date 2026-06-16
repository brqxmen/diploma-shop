package com.example.diploma_shop;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PageSmokeTests {

    @Autowired
    private MockMvc mockMvc;

    @ParameterizedTest
    @ValueSource(strings = {"/", "/shop", "/culture", "/learn", "/events", "/cart", "/profile"})
    void pagesWithSharedHeaderRender(String path) throws Exception {
        mockMvc.perform(get(path))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("main-header")));
    }

    @ParameterizedTest
    @ValueSource(strings = {"/admin", "/admin/products", "/admin/events", "/admin/clients", "/admin/orders", "/admin/subscribers"})
    void adminPagesRender(String path) throws Exception {
        mockMvc.perform(get(path))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("admin-body")));
    }

    @ParameterizedTest
    @ValueSource(strings = {"2026-06-21T18:00", "2025-08-30T16:00", "2025-05-17T16:30"})
    void eventsPageUsesFixedDemoDates(String dateIso) throws Exception {
        mockMvc.perform(get("/events"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(dateIso)));
    }

    @ParameterizedTest
    @ValueSource(strings = {"2026-06-30", "2026-07-16"})
    void eventsPageDoesNotUseOldWrongUpcomingDates(String dateIso) throws Exception {
        mockMvc.perform(get("/events"))
                .andExpect(status().isOk())
                .andExpect(content().string(not(containsString(dateIso))));
    }
}

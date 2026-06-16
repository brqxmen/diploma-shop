package com.example.diploma_shop.config;

import com.example.diploma_shop.module.Events;
import com.example.diploma_shop.module.CustomerProfile;
import com.example.diploma_shop.module.Product;
import com.example.diploma_shop.repositories.CustomerProfileRepository;
import com.example.diploma_shop.repositories.EventRepository;
import com.example.diploma_shop.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DemoDataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final EventRepository eventRepository;
    private final CustomerProfileRepository customerProfileRepository;

    public DemoDataSeeder(ProductRepository productRepository,
                          EventRepository eventRepository,
                          CustomerProfileRepository customerProfileRepository) {
        this.productRepository = productRepository;
        this.eventRepository = eventRepository;
        this.customerProfileRepository = customerProfileRepository;
    }

    @Override
    public void run(String... args) {
        seedProducts();
        seedEvents();
        seedCustomerProfiles();
    }

    private void seedProducts() {
        if (productRepository.count() > 0) {
            return;
        }

        productRepository.save(product(
                "Lakai Conrad - Elite Black Gum Suede",
                84.95,
                null,
                "lakai.png",
                "39, 42",
                "Clothes",
                "Lakai",
                "Shoes",
                "Black",
                "lakai_top.jpg, lakai_bot.jpg",
                "Black suede skate shoes with a clean profile and durable everyday construction."
        ));

        productRepository.save(product(
                "Aura Wrench - Red",
                69.95,
                null,
                "aura_wrench_r.jpg",
                "7.8, 8, 8.125, 8.25, 8.38, 8.5, 8.75",
                "Skateboarding",
                "Aura",
                "Deck",
                "Red",
                "",
                "Red skateboard deck with a strong pop and classic street shape."
        ));

        productRepository.save(product(
                "Footwork Fleece Black Hat",
                10.29,
                null,
                "hatfootbl.jpg",
                "",
                "Clothes",
                "Footwork",
                "Hat",
                "Black",
                "hatfootbl2.jpg, hatfootbl3.jpg",
                "Warm ribbed acrylic hat with fleece lining and embroidered label."
        ));

        productRepository.save(product(
                "Footwork Fleece Tan Hat",
                10.29,
                null,
                "hatfoottn.jpg",
                "",
                "Clothes",
                "Footwork",
                "Hat",
                "Tan",
                "hatfoottn2.jpg, hatfoottn3.jpg",
                "Warm tan beanie with soft fleece lining for cold sessions."
        ));

        productRepository.save(product(
                "Bones® REDS® Skateboard Bearings 8 pack",
                24.95,
                null,
                "bonesbrbl.jpg",
                "",
                "Skateboarding",
                "Bones",
                "Bearings",
                "Black",
                "bonesbrbl2.jpg",
                "Skate Rated bearings with removable rubber shields and pre-lubricated speed cream."
        ));

        productRepository.save(product(
                "T-Tool skateboard tool",
                6.87,
                null,
                "ttool.jpg",
                "",
                "Accesses",
                "",
                "Tool",
                "Black",
                "ttool2.jpg",
                "Compact all-in-one skateboard tool for tightening trucks, wheels, and hardware."
        ));

        productRepository.save(product(
                "HABITAT x PINK FLOYD Dark Side of the Moon Griptape",
                20.61,
                null,
                "pinkfloydgrip.jpg",
                "",
                "Skateboarding",
                "HABITAT",
                "Griptape",
                "",
                "",
                "One sheet of graphic skateboard griptape, 9 x 33 inches."
        ));

        productRepository.save(product(
                "Habitat Baxter-Neal Textile Skateboard Deck - 8.50\"",
                74.95,
                null,
                "habitatd.jpg",
                "",
                "Skateboarding",
                "Habitat",
                "Deck",
                "",
                "habitat2.jpg",
                "7-ply North American maple deck with textile series graphic and medium concave."
        ));

        productRepository.save(product(
                "GIRL OG WHITE BAR WAX",
                16.40,
                null,
                "pargirl.jpeg",
                "",
                "Accesses",
                "Girl",
                "Wax",
                "",
                "pargirl2.jpeg",
                "Skate wax for rails, ledges, curbs, and smoother street sessions."
        ));

        productRepository.save(product(
                "Japan Autumn Vest",
                58.99,
                42.49,
                "erasedj.jpg",
                "S, M, L, XL, XXL",
                "Clothes",
                "Erased",
                "Vest",
                "",
                "erasedj2.jpg, erasedj3.jpg",
                "Lightweight vest with a bonus price for the diploma shop demo."
        ));
    }

    private void seedEvents() {
        upsertEvent(event(
                "STREET 19 Best Trick Session",
                "Open skate session with a best trick contest and prizes from the shop.",
                "21.06.jpg",
                LocalDateTime.of(2026, 6, 21, 18, 0),
                "Almaty Skate Plaza",
                "Registration opens one hour before the session. Demo event for the diploma project."
        ));

        upsertEvent(event(
                "Deck Setup Workshop",
                "A small workshop where beginners learn how to assemble and tune a skateboard.",
                "30.08.jpg",
                LocalDateTime.of(2025, 8, 30, 16, 0),
                "STREET 19 Pop-up Zone",
                "Visitors can test tools, bearings, griptape, and different deck sizes."
        ));

        upsertEvent(event(
                "Spring Street Jam",
                "A past street session with local riders, music, and mini contests.",
                "21.03.jpg",
                LocalDateTime.of(2025, 3, 21, 17, 30),
                "Almaty Downtown Spot",
                "Archive event from the STREET 19 spring program."
        ));

        upsertEvent(event(
                "Beginner Skate Day",
                "An open lesson for beginners with warm-up drills and first trick practice.",
                "28.03.jpg",
                LocalDateTime.of(2025, 3, 28, 15, 0),
                "STREET 19 Mini Ramp",
                "Coaches helped new riders pick a stance, balance, and safer first lines."
        ));

        upsertEvent(event(
                "Community Park Session",
                "A community meetup with shared boards, filming, and best line voting.",
                "02.05.jpg",
                LocalDateTime.of(2025, 5, 2, 18, 0),
                "Central Skate Park",
                "Photos and highlights from one of the early summer archive sessions."
        ));

        upsertEvent(event(
                "Girls Skate Meetup",
                "A supportive meetup for girls and young riders with trick coaching.",
                "17.05.jpg",
                LocalDateTime.of(2025, 5, 17, 16, 30),
                "STREET 19 Pop-up Zone",
                "Archive event with beginner-friendly workshops and open practice."
        ));
    }

    private void upsertEvent(Events demoEvent) {
        List<Events> existingEvents = eventRepository.findAllByImageUrl(demoEvent.getImageUrl());

        if (existingEvents.isEmpty()) {
            eventRepository.save(demoEvent);
            return;
        }

        for (Events existingEvent : existingEvents) {
            existingEvent.setTitle(demoEvent.getTitle());
            existingEvent.setDescription(demoEvent.getDescription());
            existingEvent.setDetails(demoEvent.getDetails());
            existingEvent.setEventDate(demoEvent.getEventDate());
            existingEvent.setLocation(demoEvent.getLocation());
            eventRepository.save(existingEvent);
        }
    }

    private void seedCustomerProfiles() {
        upsertCustomerProfile(customer(
                "Maya",
                "Sultan",
                "maya@street19.local",
                true,
                true,
                "Almaty, Dostyk Ave 19"
        ));

        upsertCustomerProfile(customer(
                "Arman",
                "Kim",
                "arman@street19.local",
                true,
                false,
                "Almaty, Abay Ave 42"
        ));
    }

    private void upsertCustomerProfile(CustomerProfile demoProfile) {
        CustomerProfile profile = customerProfileRepository.findByEmailIgnoreCase(demoProfile.getEmail())
                .orElseGet(CustomerProfile::new);

        profile.setFirstName(demoProfile.getFirstName());
        profile.setLastName(demoProfile.getLastName());
        profile.setEmail(demoProfile.getEmail());
        profile.setEmailVerified(demoProfile.getEmailVerified());
        profile.setEmailOffers(demoProfile.getEmailOffers());
        profile.setAddress(demoProfile.getAddress());

        customerProfileRepository.save(profile);
    }

    private Product product(String name,
                            Double price,
                            Double bonusPrice,
                            String imageName,
                            String size,
                            String category,
                            String brand,
                            String productType,
                            String color,
                            String galleryImages,
                            String description) {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setBonusPrice(bonusPrice);
        product.setImageName(imageName);
        product.setSize(size);
        product.setCategory(category);
        product.setBrand(brand);
        product.setProductType(productType);
        product.setColor(color);
        product.setGalleryImages(galleryImages);
        product.setDescription(description);
        return product;
    }

    private Events event(String title,
                         String description,
                         String imageUrl,
                         LocalDateTime eventDate,
                         String location,
                         String details) {
        Events event = new Events();
        event.setTitle(title);
        event.setDescription(description);
        event.setImageUrl(imageUrl);
        event.setEventDate(eventDate);
        event.setLocation(location);
        event.setDetails(details);
        return event;
    }

    private CustomerProfile customer(String firstName,
                                     String lastName,
                                     String email,
                                     Boolean emailVerified,
                                     Boolean emailOffers,
                                     String address) {
        CustomerProfile profile = new CustomerProfile();
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setEmail(email);
        profile.setEmailVerified(emailVerified);
        profile.setEmailOffers(emailOffers);
        profile.setAddress(address);
        return profile;
    }
}

package com.example.diploma_shop.module;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Double bonusPrice;
    private String imageName;
    private String size;
    private String category; // Clothes, Skateboarding, Accesses, Brands
    private String brand;
    private String productType;
    private String color;

    @Column(length = 2000)
    private String galleryImages;

    @Column(length = 1000)
    private String description;

    @Transient
    public Double getEffectivePrice() {
        return hasBonusPrice() ? bonusPrice : price;
    }

    @Transient
    public boolean hasBonusPrice() {
        return bonusPrice != null && bonusPrice > 0;
    }

    @Transient
    public String getImagePath() {
        return normalizeImagePath(imageName);
    }

    @Transient
    public List<String> getGalleryImagePaths() {
        LinkedHashSet<String> images = new LinkedHashSet<>();
        String mainImage = getImagePath();

        if (!mainImage.isBlank()) {
            images.add(mainImage);
        }

        if (galleryImages != null && !galleryImages.isBlank()) {
            for (String image : galleryImages.split("[,;\\n]+")) {
                String normalized = normalizeImagePath(image);
                if (!normalized.isBlank()) {
                    images.add(normalized);
                }
            }
        }

        return new ArrayList<>(images);
    }

    @Transient
    public List<String> getSizeOptions() {
        if (size == null || size.isBlank()) {
            return List.of();
        }

        List<String> sizes = new ArrayList<>();
        for (String option : size.split("[,;/|\\n]+")) {
            String value = option.trim();
            if (!value.isBlank()) {
                sizes.add(value);
            }
        }

        if (sizes.isEmpty()) {
            sizes.add(size.trim());
        }

        return sizes;
    }

    private String normalizeImagePath(String rawImageName) {
        if (rawImageName == null || rawImageName.isBlank()) {
            return "";
        }

        String image = rawImageName.trim();

        if (image.startsWith("http")) {
            return image;
        }
        if (image.contains("static/images/")) {
            return "/images/" + image.substring(image.indexOf("static/images/") + "static/images/".length());
        }
        if (image.contains("/images/")) {
            return "/images/" + image.substring(image.indexOf("/images/") + "/images/".length());
        }
        if (image.startsWith("images/")) {
            return "/" + image;
        }
        if (image.startsWith("/")) {
            return image;
        }

        return "/images/" + image;
    }

}

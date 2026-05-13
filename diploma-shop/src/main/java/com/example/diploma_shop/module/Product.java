package com.example.diploma_shop.module;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String imageName;
    private String size;
    private String category; // Clothes, Skateboarding, Accesses, Brands

    @Transient
    public String getImagePath() {
        if (imageName == null || imageName.isBlank()) {
            return "";
        }

        String image = imageName.trim();

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

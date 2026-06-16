package com.example.diploma_shop.module;

import com.example.diploma_shop.utils.ImagePathUtils;
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
    private String category;
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
        return ImagePathUtils.normalize(imageName);
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
                String normalized = ImagePathUtils.normalize(image);
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

}

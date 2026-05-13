package com.example.diploma_shop.services;

import com.example.diploma_shop.module.Product;
import com.example.diploma_shop.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(String category, String search) {
        if (search != null && !search.isBlank()) {
            return productRepository.findByNameContainingIgnoreCase(search);
        }

        if (category != null && !category.isBlank() && !category.equals("All")) {
            return productRepository.findByCategory(category);
        }

        return productRepository.findAll();
    }
}

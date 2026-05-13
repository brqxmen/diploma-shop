package com.example.diploma_shop.controllers;

import com.example.diploma_shop.module.Product;
import com.example.diploma_shop.services.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ShopController {

    private final ProductService productService;

    public ShopController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/shop")
    public String shop(@RequestParam(required = false) String category,
                       @RequestParam(required = false) String search,
                       Model model) {
        List<Product> items = productService.getProducts(category, search);

        model.addAttribute("items", items);
        model.addAttribute("activeCategory", category != null ? category : "All");
        model.addAttribute("search", search != null ? search : "");
        return "shop";
    }

    @GetMapping("/cart")
    public String cart() {
        return "cart";
    }

    @GetMapping({"/profile", "/profile/orders"})
    public String profile() {
        return "profile";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }
}

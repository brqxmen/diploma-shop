package com.example.diploma_shop.controllers;

import com.example.diploma_shop.module.Product;
import com.example.diploma_shop.services.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
                       @RequestParam(required = false) String brand,
                       @RequestParam(required = false) String productType,
                       @RequestParam(required = false) String search,
                       Model model) {
        String activeCategory = brand != null && !brand.isBlank() && (category == null || category.isBlank())
                ? "Brands"
                : (category != null ? category : "All");
        List<Product> items = productService.getProducts(activeCategory, brand, productType, search);

        model.addAttribute("items", items);
        model.addAttribute("activeCategory", activeCategory);
        model.addAttribute("brands", productService.getBrands());
        model.addAttribute("brandTypes", productService.getProductTypesForBrand(brand));
        model.addAttribute("activeBrand", brand != null ? brand : "");
        model.addAttribute("activeProductType", productType != null ? productType : "");
        model.addAttribute("search", search != null ? search : "");
        return "shop";
    }

    @GetMapping("/shop/{id}")
    public String productDetails(@PathVariable Long id, Model model) {
        return productService.getProduct(id)
                .map(product -> {
                    model.addAttribute("product", product);
                    model.addAttribute("galleryImages", product.getGalleryImagePaths());
                    model.addAttribute("sizes", product.getSizeOptions());
                    return "product";
                })
                .orElse("redirect:/shop");
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

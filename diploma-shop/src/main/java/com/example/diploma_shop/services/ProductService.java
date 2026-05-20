package com.example.diploma_shop.services;

import com.example.diploma_shop.module.Product;
import com.example.diploma_shop.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.TreeMap;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(String category, String brand, String productType, String search) {
        return productRepository.findAll().stream()
                .filter(product -> matchesSearch(product, search))
                .filter(product -> matchesCategory(product, category))
                .filter(product -> matchesBrand(product, brand))
                .filter(product -> matchesProductType(product, productType))
                .toList();
    }

    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    public List<String> getBrands() {
        List<String> brands = productRepository.findAll().stream()
                .map(this::resolveBrand)
                .filter(value -> !value.isBlank())
                .toList();

        return distinctSortedIgnoreCase(brands);
    }

    public List<String> getProductTypesForBrand(String brand) {
        if (isBlank(brand)) {
            return List.of();
        }

        List<String> productTypes = productRepository.findAll().stream()
                .filter(product -> equalsIgnoreCase(resolveBrand(product), brand))
                .map(this::resolveProductType)
                .filter(value -> !value.isBlank())
                .toList();

        return distinctSortedIgnoreCase(productTypes);
    }

    public String resolveBrand(Product product) {
        if (product == null) {
            return "";
        }

        return isBlank(product.getBrand()) ? "" : product.getBrand().trim();
    }

    public String resolveProductType(Product product) {
        if (product == null) {
            return "";
        }

        if (!isBlank(product.getProductType())) {
            return product.getProductType().trim();
        }

        return inferProductType(product);
    }

    private boolean matchesSearch(Product product, String search) {
        if (isBlank(search)) {
            return true;
        }

        String needle = search.trim().toLowerCase(Locale.ROOT);
        return contains(product.getName(), needle)
                || contains(resolveBrand(product), needle)
                || contains(resolveProductType(product), needle)
                || contains(product.getCategory(), needle);
    }

    private boolean matchesCategory(Product product, String category) {
        if (isBlank(category) || equalsIgnoreCase(category, "All")) {
            return true;
        }

        if (equalsIgnoreCase(category, "Brands")) {
            return !resolveBrand(product).isBlank();
        }

        return equalsIgnoreCase(product.getCategory(), category);
    }

    private boolean matchesBrand(Product product, String brand) {
        if (isBlank(brand)) {
            return true;
        }

        return equalsIgnoreCase(resolveBrand(product), brand);
    }

    private boolean matchesProductType(Product product, String productType) {
        if (isBlank(productType)) {
            return true;
        }

        return equalsIgnoreCase(resolveProductType(product), productType);
    }

    private String inferProductType(Product product) {
        String name = product.getName() == null ? "" : product.getName().toLowerCase(Locale.ROOT);

        if (name.contains("griptape") || name.contains("grip tape")) return "Griptape";
        if (name.contains("bearing")) return "Bearings";
        if (name.contains("wrench") || name.contains("deck")) return "Deck";
        if (name.contains("tool")) return "Tool";
        if (name.contains("hat")) return "Hat";
        if (name.contains("shoe") || name.contains("lakai") || name.contains("conrad")) return "Shoes";
        if (name.contains("tee") || name.contains("shirt")) return "T-shirt";

        return isBlank(product.getCategory()) ? "Product" : product.getCategory().trim();
    }

    private boolean contains(String value, String needle) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(needle);
    }

    private boolean equalsIgnoreCase(String left, String right) {
        return left != null && right != null && left.trim().equalsIgnoreCase(right.trim());
    }

    private List<String> distinctSortedIgnoreCase(List<String> values) {
        TreeMap<String, String> uniqueValues = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);

        for (String value : values) {
            if (!isBlank(value)) {
                String trimmedValue = value.trim();
                uniqueValues.putIfAbsent(trimmedValue, trimmedValue);
            }
        }

        return new ArrayList<>(uniqueValues.values());
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}

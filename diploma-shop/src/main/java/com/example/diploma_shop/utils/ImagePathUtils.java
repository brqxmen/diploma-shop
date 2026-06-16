package com.example.diploma_shop.utils;

public final class ImagePathUtils {

    private ImagePathUtils() {
    }

    public static String normalize(String rawImageName) {
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

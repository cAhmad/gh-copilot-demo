package com.github.copilot.demo.albumapi;

public record Album(
    int id,
    String title,
    String artist,
    double price,
    String imageUrl
) {
}

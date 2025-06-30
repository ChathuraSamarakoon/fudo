package com.fudo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String details;

    // --- NEWLY ADDED FIELD ---
    @Column(nullable = false, length = 255)
    private String category;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false, length = 100)
    private String image_01;

    @Column(nullable = false, length = 100)
    private String image_02;

    @Column(nullable = false, length = 100)
    private String image_03;
}
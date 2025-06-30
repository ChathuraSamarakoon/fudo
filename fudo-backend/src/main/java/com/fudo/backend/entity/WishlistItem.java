package com.fudo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "wishlist")
@NoArgsConstructor
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "pid")
    private Integer productId;

    private String name;
    private int price;
    private String image;

    public WishlistItem(Integer userId, Product product) {
        this.userId = userId;
        this.productId = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.image = product.getImage_01();
    }
}
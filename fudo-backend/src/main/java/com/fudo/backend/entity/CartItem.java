package com.fudo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "cart")
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "pid")
    private Integer productId;

    private String name;
    private int price;
    private int quantity;
    private String image;

    public CartItem(Integer userId, Product product, int quantity) {
        this.userId = userId;
        this.productId = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.image = product.getImage_01();
        this.quantity = quantity;
    }
}
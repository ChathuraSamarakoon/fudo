package com.fudo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    private String name;
    private String number;
    private String email;
    private String method;

    @Column(length = 500)
    private String address;

    @Column(name = "total_products", length = 1000)
    private String totalProducts;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "placed_on")
    private LocalDate placedOn;

    @Column(name = "payment_status", length = 20)
    private String paymentStatus;

    // This method will be automatically called by JPA before the entity is saved
    @PrePersist
    public void prePersist() {
        placedOn = LocalDate.now();
        if (paymentStatus == null) {
            paymentStatus = "pending";
        }
    }
}
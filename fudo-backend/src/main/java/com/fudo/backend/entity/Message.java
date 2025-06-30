package com.fudo.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId; // Can be null if sent by a non-logged-in user

    private String name;
    private String email;
    private String number;

    @Column(length = 500)
    private String message;
}
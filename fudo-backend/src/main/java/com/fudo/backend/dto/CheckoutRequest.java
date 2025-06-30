package com.fudo.backend.dto;

import lombok.Data;

@Data
public class CheckoutRequest {
    private String name;
    private String number;
    private String email;
    private String method; // Payment method

    // Address fields
    private String flat;
    private String street;
    private String city;
    private String state;
    private String country;
    private String pin_code;
}
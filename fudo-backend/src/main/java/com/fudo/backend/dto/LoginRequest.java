package com.fudo.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String name; // For admin login
    private String password;
}
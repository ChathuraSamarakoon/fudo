package com.fudo.backend.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String email; // Only for user profile
}
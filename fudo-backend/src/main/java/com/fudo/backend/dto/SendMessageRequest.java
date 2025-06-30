package com.fudo.backend.dto;

import lombok.Data;

@Data
public class SendMessageRequest {
    private String name;
    private String email;
    private String number;
    private String message;
}
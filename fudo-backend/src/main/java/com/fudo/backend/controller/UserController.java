package com.fudo.backend.controller;

import com.fudo.backend.dto.UpdatePasswordRequest;
import com.fudo.backend.dto.UpdateProfileRequest;
import com.fudo.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private AuthService authService;

    @PutMapping("/{userId}/profile")
    public ResponseEntity<?> updateUserProfile(@PathVariable Integer userId, @RequestBody UpdateProfileRequest request) {
        try {
            return ResponseEntity.ok(authService.updateUserProfile(userId, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<?> updateUserPassword(@PathVariable Integer userId, @RequestBody UpdatePasswordRequest request) {
        try {
            authService.updateUserPassword(userId, request);
            return ResponseEntity.ok("Password updated successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
package com.fudo.backend.controller;

import com.fudo.backend.dto.UpdatePasswordRequest;
import com.fudo.backend.dto.UpdateProfileRequest;
import com.fudo.backend.entity.Admin;
import com.fudo.backend.entity.User;
import com.fudo.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // --- Account Management ---
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer userId) {
        try {
            adminService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @DeleteMapping("/admins/{adminId}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Integer adminId) {
        // In a real app, the current admin's ID would be taken from the security context (e.g., JWT)
        // For now, we'll simulate it, assuming admin ID 1 is making the request.
        Integer currentAdminId = 1;
        try {
            adminService.deleteAdmin(currentAdminId, adminId);
            return ResponseEntity.ok("Admin deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- Profile Updates ---
    @PutMapping("/profile/{adminId}")
    public ResponseEntity<?> updateAdminProfile(@PathVariable Integer adminId, @RequestBody UpdateProfileRequest request) {
        try {
            return ResponseEntity.ok(adminService.updateAdminProfile(adminId, request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/password/{adminId}")
    public ResponseEntity<?> updateAdminPassword(@PathVariable Integer adminId, @RequestBody UpdatePasswordRequest request) {
        try {
            adminService.updateAdminPassword(adminId, request);
            return ResponseEntity.ok("Password updated successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
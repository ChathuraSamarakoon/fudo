package com.fudo.backend.controller;

import com.fudo.backend.dto.DemoteAdminRequest;
import com.fudo.backend.dto.LoginRequest;
import com.fudo.backend.entity.Admin;
import com.fudo.backend.entity.User;
import com.fudo.backend.service.AdminService;
import com.fudo.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AdminService adminService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            authService.registerUser(user);
            return ResponseEntity.ok("Registered successfully, login now please!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.loginUser(loginRequest);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/admins/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            adminService.registerAdmin(admin);
            return ResponseEntity.ok("New admin registered successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/admins/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest loginRequest) {
        try {
            Admin admin = adminService.loginAdmin(loginRequest);
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/admins/promote/{userId}")
    public ResponseEntity<?> promoteUser(@PathVariable Integer userId) {
        try {
            Admin newAdmin = adminService.promoteUserToAdmin(userId);
            return ResponseEntity.ok(newAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/admins/demote/{adminId}")
    public ResponseEntity<?> demoteAdmin(@PathVariable Integer adminId, @RequestBody DemoteAdminRequest request) {
        try {
            User newUser = authService.demoteAdminToUser(adminId, request.getEmail());
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
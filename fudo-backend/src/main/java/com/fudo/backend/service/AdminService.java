package com.fudo.backend.service;

import com.fudo.backend.dto.LoginRequest;
import com.fudo.backend.dto.UpdatePasswordRequest;
import com.fudo.backend.dto.UpdateProfileRequest;
import com.fudo.backend.entity.Admin;
import com.fudo.backend.entity.User;
import com.fudo.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- Injected for deleting user-related data ---
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    public Admin registerAdmin(Admin admin) {
        if (adminRepository.findByName(admin.getName()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin loginAdmin(LoginRequest loginRequest) {
        Admin admin = adminRepository.findByName(loginRequest.getName())
                .orElseThrow(() -> new RuntimeException("Incorrect username or password!"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Incorrect username or password!");
        }
        return admin;
    }

    @Transactional
    public Admin promoteUserToAdmin(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (adminRepository.findByName(user.getName()).isPresent()) {
            throw new RuntimeException("An admin with the name " + user.getName() + " already exists!");
        }

        Admin newAdmin = new Admin();
        newAdmin.setName(user.getName());
        newAdmin.setPassword(user.getPassword());

        Admin savedAdmin = adminRepository.save(newAdmin);
        userRepository.delete(user);

        return savedAdmin;
    }

    // --- NEW METHODS FOR ACCOUNT MANAGEMENT AND PROFILE UPDATES ---

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Transactional
    public void deleteUser(Integer userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        // Delete all related data first, as in users_accounts.php
        orderRepository.deleteByUserId(userId);
        cartItemRepository.deleteByUserId(userId);
        wishlistItemRepository.deleteByUserId(userId);
        // Note: Messages are not deleted automatically by userId. This would require a custom query or iterating.
        // For simplicity, we follow the main entity deletions.
        userRepository.deleteById(userId);
    }

    public void deleteAdmin(Integer currentAdminId, Integer adminToDeleteId) {
        if (currentAdminId.equals(adminToDeleteId)) {
            throw new RuntimeException("Admin cannot delete their own account.");
        }
        if (!adminRepository.existsById(adminToDeleteId)) {
            throw new RuntimeException("Admin not found");
        }
        adminRepository.deleteById(adminToDeleteId);
    }

    @Transactional
    public Admin updateAdminProfile(Integer adminId, UpdateProfileRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setName(request.getName());
        return adminRepository.save(admin);
    }

    @Transactional
    public void updateAdminPassword(Integer adminId, UpdatePasswordRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!passwordEncoder.matches(request.getOldPassword(), admin.getPassword())) {
            throw new RuntimeException("Old password not matched!");
        }
        admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        adminRepository.save(admin);
    }
}
package com.fudo.backend.service;

import com.fudo.backend.dto.LoginRequest;
import com.fudo.backend.dto.UpdatePasswordRequest;
import com.fudo.backend.dto.UpdateProfileRequest;
import com.fudo.backend.entity.Admin;
import com.fudo.backend.entity.User;
import com.fudo.backend.repository.AdminRepository;
import com.fudo.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loginUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Incorrect username or password!"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect username or password!");
        }

        return user;
    }

    @Transactional
    public User demoteAdminToUser(Integer adminId, String email) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + adminId));

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("A user with the email " + email + " already exists!");
        }

        User newUser = new User();
        newUser.setName(admin.getName());
        newUser.setPassword(admin.getPassword());
        newUser.setEmail(email);

        User savedUser = userRepository.save(newUser);
        adminRepository.delete(admin);

        return savedUser;
    }

    // --- NEW METHODS FOR PROFILE UPDATE ---

    @Transactional
    public User updateUserProfile(Integer userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if new email is already taken by another user
        userRepository.findByEmail(request.getEmail()).ifPresent(existingUser -> {
            if (!existingUser.getId().equals(userId)) {
                throw new RuntimeException("Email already in use");
            }
        });

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        return userRepository.save(user);
    }

    @Transactional
    public void updateUserPassword(Integer userId, UpdatePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password not matched!");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
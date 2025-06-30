package com.fudo.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    // Define the upload directory. Create this folder in your project's root directory.
    private final Path root = Paths.get("uploaded_img");

    public FileStorageService() {
        try {
            if (!Files.exists(root)) {
                Files.createDirectory(root);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!", e);
        }
    }

    public String save(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file.");
            }
            // Generate a unique filename to avoid overwriting
            String uniqueFilename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            Files.copy(file.getInputStream(), this.root.resolve(uniqueFilename));
            return uniqueFilename;
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file. Error: " + e.getMessage());
        }
    }
}
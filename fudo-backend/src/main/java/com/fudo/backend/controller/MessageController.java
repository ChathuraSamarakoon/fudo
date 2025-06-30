package com.fudo.backend.controller;

import com.fudo.backend.dto.SendMessageRequest;
import com.fudo.backend.entity.Message;
import com.fudo.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageService messageService;

    // Endpoint for anyone to send a message
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest request) {
        // Assuming userId is null for non-logged-in users, would be passed from frontend if logged in
        Message savedMessage = messageService.saveMessage(request, null);
        return ResponseEntity.ok(savedMessage);
    }

    // Endpoint for admin to get all messages
    @GetMapping("/admin/all")
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    // Endpoint for admin to delete a message
    @DeleteMapping("/admin/{messageId}")
    public ResponseEntity<?> deleteMessage(@PathVariable Integer messageId) {
        try {
            messageService.deleteMessage(messageId);
            return ResponseEntity.ok("Message deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
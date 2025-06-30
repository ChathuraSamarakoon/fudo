package com.fudo.backend.service;

import com.fudo.backend.dto.SendMessageRequest;
import com.fudo.backend.entity.Message;
import com.fudo.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(SendMessageRequest request, Integer userId) {
        Message message = new Message();
        message.setUserId(userId); // userId can be null
        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setNumber(request.getNumber());
        message.setMessage(request.getMessage());
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public void deleteMessage(Integer messageId) {
        if (!messageRepository.existsById(messageId)) {
            throw new RuntimeException("Message not found");
        }
        messageRepository.deleteById(messageId);
    }
}
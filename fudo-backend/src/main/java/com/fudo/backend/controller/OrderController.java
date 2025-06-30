package com.fudo.backend.controller;

import com.fudo.backend.dto.CheckoutRequest;
import com.fudo.backend.entity.Order;
import com.fudo.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Endpoint for a user to place an order
    @PostMapping("/{userId}")
    public ResponseEntity<?> placeOrder(@PathVariable Integer userId, @RequestBody CheckoutRequest request) {
        try {
            Order order = orderService.placeOrder(userId, request);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint for a user to view their order history
    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    // Endpoint for an admin to view all orders
    @GetMapping("/admin/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // Endpoint for an admin to update an order's payment status
    @PutMapping("/admin/{orderId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Integer orderId, @RequestBody Map<String, String> payload) {
        try {
            String status = payload.get("payment_status");
            Order updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
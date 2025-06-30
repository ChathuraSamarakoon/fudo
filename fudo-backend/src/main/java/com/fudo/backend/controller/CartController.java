package com.fudo.backend.controller;

import com.fudo.backend.dto.AddToCartRequest;
import com.fudo.backend.entity.CartItem;
import com.fudo.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Integer userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable Integer userId, @RequestBody AddToCartRequest request) {
        try {
            CartItem cartItem = cartService.addToCart(userId, request.getProductId(), request.getQuantity());
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Integer cartItemId, @RequestBody Map<String, Integer> payload) {
        try {
            int quantity = payload.get("quantity");
            CartItem updatedItem = cartService.updateCartItemQuantity(cartItemId, quantity);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Integer cartItemId) {
        cartService.removeCartItem(cartItemId);
        return ResponseEntity.ok("Item removed from cart successfully.");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> clearCart(@PathVariable Integer userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared successfully.");
    }
}
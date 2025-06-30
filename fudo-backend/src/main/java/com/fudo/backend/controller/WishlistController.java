package com.fudo.backend.controller;

import com.fudo.backend.entity.WishlistItem;
import com.fudo.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlistItems(@PathVariable Integer userId) {
        return ResponseEntity.ok(wishlistService.getWishlistItems(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> addToWishlist(@PathVariable Integer userId, @RequestBody Map<String, Integer> payload) {
        try {
            Integer productId = payload.get("productId");
            WishlistItem wishlistItem = wishlistService.addToWishlist(userId, productId);
            return ResponseEntity.ok(wishlistItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/items/{wishlistItemId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Integer wishlistItemId) {
        wishlistService.removeFromWishlist(wishlistItemId);
        return ResponseEntity.ok("Item removed from wishlist successfully.");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> clearWishlist(@PathVariable Integer userId) {
        wishlistService.clearWishlist(userId);
        return ResponseEntity.ok("Wishlist cleared successfully.");
    }
}
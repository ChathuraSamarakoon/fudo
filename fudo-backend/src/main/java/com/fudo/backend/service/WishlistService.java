package com.fudo.backend.service;

import com.fudo.backend.entity.Product;
import com.fudo.backend.entity.WishlistItem;
import com.fudo.backend.repository.CartItemRepository;
import com.fudo.backend.repository.ProductRepository;
import com.fudo.backend.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<WishlistItem> getWishlistItems(Integer userId) {
        return wishlistItemRepository.findByUserId(userId);
    }

    public WishlistItem addToWishlist(Integer userId, Integer productId) {
        // Check if already in wishlist or cart
        if (wishlistItemRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            throw new RuntimeException("Product already in wishlist!");
        }
        if (cartItemRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            throw new RuntimeException("Product already in cart!");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WishlistItem newWishlistItem = new WishlistItem(userId, product);
        return wishlistItemRepository.save(newWishlistItem);
    }

    public void removeFromWishlist(Integer wishlistItemId) {
        wishlistItemRepository.deleteById(wishlistItemId);
    }

    public void clearWishlist(Integer userId) {
        List<WishlistItem> wishlistItems = wishlistItemRepository.findByUserId(userId);
        wishlistItemRepository.deleteAll(wishlistItems);
    }
}
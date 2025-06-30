package com.fudo.backend.service;

import com.fudo.backend.entity.CartItem;
import com.fudo.backend.entity.Product;
import com.fudo.backend.repository.CartItemRepository;
import com.fudo.backend.repository.ProductRepository;
import com.fudo.backend.repository.WishlistItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private WishlistItemRepository wishlistItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItem> getCartItems(Integer userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @Transactional
    public CartItem addToCart(Integer userId, Integer productId, int quantity) {
        // Check if item is already in cart
        Optional<CartItem> existingCartItemOpt = cartItemRepository.findByUserIdAndProductId(userId, productId);
        if (existingCartItemOpt.isPresent()) {
            throw new RuntimeException("Product already in cart!");
        }

        // Check and remove from wishlist if it exists there
        wishlistItemRepository.findByUserIdAndProductId(userId, productId).ifPresent(wishlistItemRepository::delete);

        // Fetch product details
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem newCartItem = new CartItem(userId, product, quantity);
        return cartItemRepository.save(newCartItem);
    }

    public CartItem updateCartItemQuantity(Integer cartItemId, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    public void removeCartItem(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Transactional
    public void clearCart(Integer userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        cartItemRepository.deleteAll(cartItems);
    }
}
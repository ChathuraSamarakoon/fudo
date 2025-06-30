package com.fudo.backend.repository;

import com.fudo.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    List<CartItem> findByUserId(Integer userId);
    Optional<CartItem> findByUserIdAndProductId(Integer userId, Integer productId);

    // New method to delete all cart items for a given user
    void deleteByUserId(Integer userId);
}
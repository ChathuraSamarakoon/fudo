package com.fudo.backend.repository;

import com.fudo.backend.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Integer> {
    List<WishlistItem> findByUserId(Integer userId);
    Optional<WishlistItem> findByUserIdAndProductId(Integer userId, Integer productId);

    // New method to delete all wishlist items for a given user
    void deleteByUserId(Integer userId);
}
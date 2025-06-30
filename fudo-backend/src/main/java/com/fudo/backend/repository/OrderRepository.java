package com.fudo.backend.repository;

import com.fudo.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);

    // New method to delete all orders for a given user
    void deleteByUserId(Integer userId);
}
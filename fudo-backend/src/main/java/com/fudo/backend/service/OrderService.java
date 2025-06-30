package com.fudo.backend.service;

import com.fudo.backend.dto.CheckoutRequest;
import com.fudo.backend.entity.CartItem;
import com.fudo.backend.entity.Order;
import com.fudo.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    /**
     * Places an order based on the user's cart and checkout information.
     * This is a transactional operation: it will either complete successfully or fail without any partial data changes.
     */
    @Transactional
    public Order placeOrder(Integer userId, CheckoutRequest request) {
        List<CartItem> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Your cart is empty!");
        }

        // Calculate total price and format product string, similar to checkout.php
        int totalPrice = cartItems.stream()
                .mapToInt(item -> item.getPrice() * item.getQuantity())
                .sum();

        String totalProducts = cartItems.stream()
                .map(item -> String.format("%s (%d x %d)", item.getName(), item.getPrice(), item.getQuantity()))
                .collect(Collectors.joining(", "));

        // Format the address string
        String address = String.format("flat no. %s, %s, %s, %s, %s - %s",
                request.getFlat(), request.getStreet(), request.getCity(),
                request.getState(), request.getCountry(), request.getPin_code());

        // Create and save the new order
        Order order = new Order();
        order.setUserId(userId);
        order.setName(request.getName());
        order.setNumber(request.getNumber());
        order.setEmail(request.getEmail());
        order.setMethod(request.getMethod());
        order.setAddress(address);
        order.setTotalProducts(totalProducts);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        // Clear the user's cart after placing the order
        cartService.clearCart(userId);

        return savedOrder;
    }

    // For users to see their own orders
    public List<Order> getOrdersByUser(Integer userId) {
        return orderRepository.findByUserId(userId);
    }

    // For admins to see all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // For admins to update payment status
    public Order updateOrderStatus(Integer orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setPaymentStatus(status);
        return orderRepository.save(order);
    }
}
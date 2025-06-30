package com.fudo.backend.repository;

import com.fudo.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    // --- NEW METHODS FOR SEARCH AND FILTER ---

    /**
     * Finds products where the name contains the given keyword, ignoring case.
     * Corresponds to the search functionality in search_page.php
     * @param keyword The string to search for in the product name.
     * @return A list of matching products.
     */
    List<Product> findByNameContainingIgnoreCase(String keyword);

    /**
     * Finds products belonging to a specific category.
     * Corresponds to the functionality in category.php
     * @param category The category name to filter by.
     * @return A list of matching products.
     */
    List<Product> findByCategory(String category);

    @Query(value = "SELECT * FROM products LIMIT 6", nativeQuery = true)
    List<Product> findLatest6Products();
}
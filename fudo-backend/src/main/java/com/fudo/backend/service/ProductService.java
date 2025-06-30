package com.fudo.backend.service;

import com.fudo.backend.entity.Product;
import com.fudo.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FileStorageService fileStorageService; // Injected for file uploads

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // Handles creation with file uploads
    public Product createProduct(String name, Integer price, String details, String category,
                                 MultipartFile image01, MultipartFile image02, MultipartFile image03) {

        String filename1 = fileStorageService.save(image01);
        String filename2 = fileStorageService.save(image02);
        String filename3 = fileStorageService.save(image03);

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setDetails(details);
        product.setCategory(category);
        product.setImage_01(filename1);
        product.setImage_02(filename2);
        product.setImage_03(filename3);

        return productRepository.save(product);
    }

    public Product updateProduct(Integer id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDetails(productDetails.getDetails());
        product.setCategory(productDetails.getCategory());
        product.setPrice(productDetails.getPrice());

        // Note: A full implementation would also handle updating images
        if (productDetails.getImage_01() != null) {
            product.setImage_01(productDetails.getImage_01());
        }
        if (productDetails.getImage_02() != null) {
            product.setImage_02(productDetails.getImage_02());
        }
        if (productDetails.getImage_03() != null) {
            product.setImage_03(productDetails.getImage_03());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getLatestProducts() {
        return productRepository.findLatest6Products();
    }
}
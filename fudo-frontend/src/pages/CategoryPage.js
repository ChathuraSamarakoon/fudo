import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import ProductGrid from '../components/ProductGrid'; // Reusing the component

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getProductsByCategory(categoryName);
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch category products", error);
            }
        };
        fetchProducts();
    }, [categoryName]);

    return (
        <div>
            <h1 className="heading">Category: {categoryName}</h1>
            <ProductGrid products={products} />
        </div>
    );
};

export default CategoryPage;
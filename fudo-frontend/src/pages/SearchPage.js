import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productService from '../services/productService';
import ProductGrid from '../components/ProductGrid'; // A new reusable component

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const query = searchParams.get('q');

    useEffect(() => {
        if (query) {
            const fetchProducts = async () => {
                try {
                    const response = await productService.searchProducts(query);
                    setProducts(response.data);
                } catch (error) {
                    console.error("Search failed", error);
                }
            };
            fetchProducts();
        }
    }, [query]);

    return (
        <div>
            <h1 className="heading">Search Results for "{query}"</h1>
            <ProductGrid products={products} />
        </div>
    );
};

export default SearchPage;
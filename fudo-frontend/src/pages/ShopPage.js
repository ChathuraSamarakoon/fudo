import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';
import ProductGrid from '../components/ProductGrid'; // Import the reusable component

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/products');
        setProducts(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="empty">{error}</p>;
  }

  return (
    <section className="products">
      <h1 className="heading">ALL FOODS</h1>
      {/* Use the reusable ProductGrid component */}
      <ProductGrid products={products} />
    </section>
  );
};

export default ShopPage;
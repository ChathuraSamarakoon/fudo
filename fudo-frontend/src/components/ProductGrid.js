import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import cartService from '../services/cartService';
import wishlistService from '../services/wishlistService';

const ProductGrid = ({ products }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const imageBaseUrl = 'http://localhost:8080/uploaded_img/';

    const handleAddToCart = async (productId) => {
        if (!user) {
            alert('Please login to add items to the cart.');
            navigate('/login');
            return;
        }
        try {
            await cartService.addToCart(user.id, productId, 1);
            alert('Product added to cart!');
        } catch (error) {
            alert(error.response?.data || 'Failed to add item to cart.');
        }
    };
    
    const handleAddToWishlist = async (productId) => {
        if (!user) {
            alert('Please login to add items to the wishlist.');
            navigate('/login');
            return;
        }
        try {
            await wishlistService.addToWishlist(user.id, productId);
            alert('Product added to wishlist!');
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
            alert(error.response?.data || 'Failed to add item to wishlist.');
        }
    };

    if (!products || products.length === 0) {
        return <p className="empty">No products found.</p>;
    }

    return (
        <section className="products">
            <div className="box-container">
                {products.map(product => (
                    <div className="box" key={product.id}>
                        <button 
                            className="fas fa-heart" 
                            style={{
                                position: 'absolute', top: '1rem', right: '1rem', 
                                height: '4.5rem', width: '4.5rem', lineHeight: '4.2rem',
                                fontSize: '2rem', background: 'var(--white)',
                                border: 'var(--border)', borderRadius: '.5rem', cursor: 'pointer'
                            }}
                            onClick={() => handleAddToWishlist(product.id)}>
                        </button>
                        
                        <img src={`${imageBaseUrl}${product.image_01}`} alt={product.name} />
                        
                        <div className="name">{product.name}</div>
                        <div className="flex">
                            <div className="price"><span> Rs </span>{product.price}<span>/-</span></div>
                        </div>
                        <button onClick={() => handleAddToCart(product.id)} className="btn">Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import wishlistService from '../services/wishlistService';
import cartService from '../services/cartService';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const imageBaseUrl = 'http://localhost:8080/uploaded_img/';

    const fetchWishlist = async () => {
        if (!user) return;
        try {
            const response = await wishlistService.getWishlist(user.id);
            setWishlistItems(response.data);
        } catch (error) {
            console.error("Failed to fetch wishlist", error);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [user]);

    const handleRemove = async (itemId) => {
        try {
            await wishlistService.removeFromWishlist(itemId);
            fetchWishlist(); // Refresh list
        } catch (error) {
            console.error("Failed to remove item from wishlist", error);
        }
    };
    
    const handleAddToCart = async (productId) => {
        if (!user) {
            alert('Please login to add items to the cart.');
            navigate('/login');
            return;
        }
        try {
            // Note: The backend service already handles removing the item from the wishlist when added to cart
            await cartService.addToCart(user.id, productId, 1);
            alert('Product moved to cart!');
            fetchWishlist(); // Refresh wishlist after adding to cart
        } catch (error) {
            alert(error.response?.data || 'Failed to move item to cart.');
        }
    };

    return (
        <section className="products">
            <h3 className="heading">Your Wishlist</h3>
            <div className="box-container">
                {wishlistItems.length > 0 ? wishlistItems.map(item => (
                    <div className="box" key={item.id}>
                         <button type="button" className="fas fa-times" style={{position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer', background: 'var(--red)', color: 'white', padding: '0.5rem', borderRadius: '50%'}} onClick={() => handleRemove(item.id)}></button>
                        <img src={`${imageBaseUrl}${item.image}`} alt={item.name} />
                        <div className="name">{item.name}</div>
                        <div className="price">Rs {item.price}/-</div>
                        <button type="button" onClick={() => handleAddToCart(item.productId)} className="btn">Add to Cart</button>
                    </div>
                )) : (
                    <p className="empty">Your wishlist is empty.</p>
                )}
            </div>
        </section>
    );
};

export default WishlistPage;
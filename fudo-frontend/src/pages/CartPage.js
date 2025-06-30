import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import cartService from '../services/cartService';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const imageBaseUrl = 'http://localhost:8080/uploaded_img/'; // The correct base URL for images

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      const response = await cartService.getCart(user.id);
      setCartItems(response.data);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
        fetchCartItems();
    } else {
        setLoading(false);
    }
  }, [user]);

  const handleRemove = async (cartItemId) => {
    try {
      await cartService.removeFromCart(cartItemId);
      fetchCartItems();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };
  
  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;
    try {
        await cartService.updateQuantity(cartItemId, quantity);
        fetchCartItems();
    } catch (error) {
        console.error("Failed to update quantity:", error);
    }
  };

  const grandTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  if (!user) {
    return <p className="empty" style={{padding: '2rem'}}>Please <Link to="/login">login</Link> to view your cart.</p>;
  }

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  return (
    <section className="products shopping-cart">
      <h3 className="heading">Shopping Cart</h3>
      <div className="box-container">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div className="box" key={item.id}>
              <button className="fas fa-times" style={{position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer', background: 'var(--red)', color: 'white', padding: '0.5rem 1rem', borderRadius: '.5rem', fontSize: '1.5rem'}} onClick={() => handleRemove(item.id)}></button>
              
              {/* --- THIS IS THE CORRECTED LINE --- */}
              <img src={`${imageBaseUrl}${item.image}`} alt={item.name} />

              <div className="name">{item.name}</div>
              <div className="flex">
                <div className="price">Rs {item.price}/-</div>
                <input 
                    type="number" 
                    name="qty" 
                    className="qty" 
                    style={{width: '7rem', border: 'var(--border)', padding: '1rem', fontSize: '1.8rem', borderRadius: '.5rem'}}
                    min="1" 
                    max="99" 
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                />
              </div>
              <div className="sub-total" style={{fontSize: '2rem', marginTop: '1rem'}}> Sub Total : <span>Rs {item.price * item.quantity}/-</span></div>
            </div>
          ))
        ) : (
          <p className="empty">Your cart is empty.</p>
        )}
      </div>
      <div className="cart-total" style={{marginTop: '2rem', textAlign: 'center'}}>
        <p style={{fontSize: '2.5rem'}}>Grand Total : <span> Rs {grandTotal}/-</span></p>
        <Link to="/shop" className="option-btn">Continue Shopping</Link>
        <Link to="/checkout" className={`btn ${grandTotal > 0 ? '' : 'disabled'}`} style={{marginLeft: '1rem'}}>Proceed to Checkout</Link>
      </div>
    </section>
  );
};

export default CartPage;
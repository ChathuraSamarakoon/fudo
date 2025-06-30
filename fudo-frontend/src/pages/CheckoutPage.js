import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';
import cartService from '../services/cartService';

const CheckoutPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        method: 'cash on delivery',
        flat: '',
        street: '',
        city: '',
        state: '',
        country: 'Sri Lanka',
        pin_code: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchCart = async () => {
            const response = await cartService.getCart(user.id);
            if (response.data.length === 0) {
                navigate('/shop');
            }
            setCartItems(response.data);
        };
        
        setFormData(prevData => ({
            ...prevData,
            name: user.name,
            email: user.email,
        }));
        
        fetchCart();
    }, [user, navigate]);

    const grandTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await orderService.placeOrder(user.id, formData);
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error("Failed to place order:", error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <section className="checkout-orders">
            <form onSubmit={handleSubmit}>
                <h3>Your Order Summary</h3>
                <div className="display-orders">
                    {cartItems.map(item => (
                        <p key={item.id}>{item.name} <span>({item.price} x {item.quantity})</span></p>
                    ))}
                    <div className="grand-total">Grand Total : <span> Rs {grandTotal}/-</span></div>
                </div>

                <h3>Billing Details</h3>
                <div className="flex">
                    <div className="inputBox">
                        <span>Your Name :</span>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="box" required />
                    </div>
                    <div className="inputBox">
                        <span>Your Number :</span>
                        <input type="number" name="number" value={formData.number} onChange={handleChange} className="box" required />
                    </div>
                    <div className="inputBox">
                        <span>Your Email :</span>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="box" required />
                    </div>
                    <div className="inputBox">
                        <span>Payment Method :</span>
                        <select name="method" className="box" value={formData.method} onChange={handleChange}>
                            <option value="cash on delivery">Cash On Delivery</option>
                            <option value="credit card">Credit Card</option>
                            <option value="paypal">Paypal</option>
                        </select>
                    </div>
                    <div className="inputBox">
                        <span>Address line 01 (Flat/No) :</span>
                        <input type="text" name="flat" value={formData.flat} onChange={handleChange} className="box" required />
                    </div>
                     <div className="inputBox">
                        <span>Address line 02 (Street) :</span>
                        <input type="text" name="street" value={formData.street} onChange={handleChange} className="box" required />
                    </div>
                     <div className="inputBox">
                        <span>City :</span>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="box" required />
                    </div>
                     <div className="inputBox">
                        <span>Province :</span>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="box" required />
                    </div>
                     <div className="inputBox">
                        <span>Country :</span>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="box" required />
                    </div>
                     <div className="inputBox">
                        <span>ZIP Code :</span>
                        <input type="number" name="pin_code" value={formData.pin_code} onChange={handleChange} className="box" required />
                    </div>
                </div>
                <input type="submit" value="Place Order" className="btn" />
            </form>
        </section>
    );
};

export default CheckoutPage;
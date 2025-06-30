import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        const fetchOrders = async () => {
            try {
                const response = await orderService.getOrdersByUser(user.id);
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, [user]);

    if (!user) {
        return <p className="empty">Please <Link to="/login">login</Link> to view your orders.</p>;
    }

    return (
        <section className="orders">
            <h1 className="heading">Placed Orders</h1>
            <div className="box-container">
                {orders.length > 0 ? orders.map(order => (
                    <div className="box" key={order.id}>
                        <p>Placed on : <span>{order.placedOn}</span></p>
                        <p>Name : <span>{order.name}</span></p>
                        <p>Email : <span>{order.email}</span></p>
                        <p>Phone Number : <span>{order.number}</span></p>
                        <p>Address : <span>{order.address}</span></p>
                        <p>Payment Method : <span>{order.method}</span></p>
                        <p>Your orders : <span>{order.totalProducts}</span></p>
                        <p>Total price : <span> Rs {order.totalPrice}/-</span></p>
                        <p> Payment status : <span style={{ color: order.paymentStatus === 'pending' ? 'red' : 'green' }}>{order.paymentStatus}</span> </p>
                    </div>
                )) : (
                    <p className="empty">No orders placed yet!</p>
                )}
            </div>
        </section>
    );
};

export default OrdersPage;
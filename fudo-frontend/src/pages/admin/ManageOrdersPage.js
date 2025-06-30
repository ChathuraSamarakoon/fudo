import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const ManageOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await adminService.getOrders();
        setOrders(response.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    
    const handleStatusUpdate = async (id, status) => {
        try {
            await adminService.updateOrderStatus(id, status);
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <section className="orders">
            <h1 className="heading">Placed Orders</h1>
            <div className="box-container">
                {orders.map(order => (
                    <div className="box" key={order.id}>
                        <p> Placed On : <span>{order.placedOn}</span> </p>
                        <p> Name : <span>{order.name}</span> </p>
                        <p> Number : <span>{order.number}</span> </p>
                        <p> Address : <span>{order.address}</span> </p>
                        <p> Total products : <span>{order.totalProducts}</span> </p>
                        <p> Total price : <span> Rs {order.totalPrice}/-</span> </p>
                        <p> Payment method : <span>{order.method}</span> </p>
                        <form>
                            <select onChange={(e) => handleStatusUpdate(order.id, e.target.value)} value={order.paymentStatus} className="select">
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </form>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageOrdersPage;
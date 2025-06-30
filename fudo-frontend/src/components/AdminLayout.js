import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/admin_style.css'; // We'll create this file

const AdminLayout = () => {
    return (
        <div className="admin-container">
            <header className="header">
                 <section className="flex">
                    <a href="/admin/dashboard" className="logo">Admin<span>Panel</span></a>
                    <nav className="navbar">
                        <Link to="/admin/dashboard">Home</Link>
                        <Link to="/admin/products">Products</Link>
                        <Link to="/admin/orders">Orders</Link>
                        <Link to="/admin/users">Users</Link>
                        <Link to="/admin/admins">Admins</Link>
                        <Link to="/admin/messages">Messages</Link>
                    </nav>
                 </section>
            </header>
            <main className="admin-main">
                <Outlet /> {/* This is where the specific admin page will be rendered */}
            </main>
        </div>
    );
};

export default AdminLayout;
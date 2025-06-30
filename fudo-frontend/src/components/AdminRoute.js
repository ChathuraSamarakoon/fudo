import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
    const { user } = useAuth();

    // Check if user is logged in and if their role is 'admin'
    if (user && user.role === 'admin') {
        return <Outlet />; // If yes, render the child component (e.g., the admin page)
    }

    // If not, redirect to the home page or a login page
    return <Navigate to="/login" />;
};

export default AdminRoute;
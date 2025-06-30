import apiClient from './api';

// Product Management
const getProducts = () => apiClient.get('/products');
const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
const createProduct = (formData) => {
    // Axios needs a specific header for file uploads
    return apiClient.post('/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Order Management
const getOrders = () => apiClient.get('/orders/admin/all');
const updateOrderStatus = (id, status) => apiClient.put(`/orders/admin/${id}`, { payment_status: status });

// User Management
const getUsers = () => apiClient.get('/admin/users');
const deleteUser = (id) => apiClient.delete(`/admin/users/${id}`);

// Admin Management
const getAdmins = () => apiClient.get('/admin/admins');
const deleteAdmin = (id) => apiClient.delete(`/admin/admins/${id}`); // Assumes current admin ID is handled by backend security

// Message Management
const getMessages = () => apiClient.get('/messages/admin/all');
const deleteMessage = (id) => apiClient.delete(`/messages/admin/${id}`);


const adminService = {
    getProducts,
    deleteProduct,
    createProduct,
    getOrders,
    updateOrderStatus,
    getUsers,
    deleteUser,
    getAdmins,
    deleteAdmin,
    getMessages,
    deleteMessage,
};

export default adminService;
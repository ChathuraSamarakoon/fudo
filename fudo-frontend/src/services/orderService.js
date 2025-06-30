import apiClient from './api';

const getOrdersByUser = (userId) => {
  return apiClient.get(`/orders/${userId}`);
};

// --- NEWLY ADDED FUNCTION ---
const placeOrder = (userId, checkoutData) => {
  return apiClient.post(`/orders/${userId}`, checkoutData);
};

const orderService = {
  getOrdersByUser,
  placeOrder, // Export the new function
};

export default orderService;
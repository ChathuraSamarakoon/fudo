import apiClient from './api';

const getCart = (userId) => {
  return apiClient.get(`/cart/${userId}`);
};

const addToCart = (userId, productId, quantity) => {
  return apiClient.post(`/cart/${userId}`, { productId, quantity });
};

const updateQuantity = (cartItemId, quantity) => {
  return apiClient.put(`/cart/items/${cartItemId}`, { quantity });
};

const removeFromCart = (cartItemId) => {
  return apiClient.delete(`/cart/items/${cartItemId}`);
};

const clearCart = (userId) => {
    return apiClient.delete(`/cart/${userId}`);
}

const cartService = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};

export default cartService;
import apiClient from './api';

const getWishlist = (userId) => {
  return apiClient.get(`/wishlist/${userId}`);
};

const addToWishlist = (userId, productId) => {
  return apiClient.post(`/wishlist/${userId}`, { productId });
};

const removeFromWishlist = (wishlistItemId) => {
  return apiClient.delete(`/wishlist/items/${wishlistItemId}`);
};

const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default wishlistService;
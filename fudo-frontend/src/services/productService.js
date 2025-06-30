import apiClient from './api';

const searchProducts = (keyword) => {
  return apiClient.get(`/products/search?keyword=${keyword}`);
};

const getProductsByCategory = (categoryName) => {
  return apiClient.get(`/products/category/${categoryName}`);
};

const productService = {
  searchProducts,
  getProductsByCategory,
};

export default productService;
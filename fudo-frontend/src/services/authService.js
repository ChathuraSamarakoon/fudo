import apiClient from './api';

const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

// --- NEWLY ADDED FUNCTION ---
const adminLogin = (credentials) => {
    return apiClient.post('/admins/login', credentials);
}

const authService = {
  register,
  login,
  adminLogin, // Export new function
};

export default authService;
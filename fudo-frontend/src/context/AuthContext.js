import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const userData = { ...response.data, role: 'user' }; // Add role for user
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };
  
  const adminLogin = async (credentials) => {
    const response = await authService.adminLogin(credentials);
    const adminData = { ...response.data, role: 'admin' }; // Add role for admin
    localStorage.setItem('user', JSON.stringify(adminData));
    setUser(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  const updateUserInContext = (updatedUser) => {
    const userData = { ...updatedUser, role: 'user' };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, logout, updateUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage'; // Import the new page
import './assets/css/style.css';

// Admin Components
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageAdminsPage from './pages/admin/ManageAdminsPage';
import ViewMessagesPage from './pages/admin/ViewMessagesPage';


function App() {
  return (
    <Router>
      <Routes>
        {/* User-facing Routes */}
        <Route path="/*" element={<UserRoutes />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ManageProductsPage />} />
            <Route path="orders" element={<ManageOrdersPage />} />
            <Route path="users" element={<ManageUsersPage />} />
            <Route path="admins" element={<ManageAdminsPage />} />
            <Route path="messages" element={<ViewMessagesPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

// Helper component to group user routes with the main layout
const UserRoutes = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} /> {/* Added Route */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};


export default App;
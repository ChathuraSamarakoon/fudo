import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [name, setName] = useState('admin');
  const [password, setPassword] = useState('111');
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminLogin({ name, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Admin Login</h3>
        <p>Default username = <span>admin</span> & password = <span>111</span></p>
        {error && <p className="empty">{error}</p>}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="box" placeholder="enter username"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="box" placeholder="enter password"/>
        <input type="submit" value="Login Now" className="btn"/>
      </form>
    </section>
  );
};

export default AdminLoginPage;
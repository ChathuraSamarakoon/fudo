import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login({ email, password });
      navigate('/'); // Redirect to home page on successful login
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Login Now</h3>
        {error && <p className="empty">{error}</p>}
        <input
          type="email"
          name="email"
          required
          placeholder="enter your email"
          maxLength="50"
          className="box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="pass"
          required
          placeholder="enter your password"
          maxLength="20"
          className="box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="login now" className="btn" name="submit" />
        <p>
          Don't have an account? <Link to="/register" className="link">Register Now</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
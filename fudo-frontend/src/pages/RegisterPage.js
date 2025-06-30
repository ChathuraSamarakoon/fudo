import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpass, setCPass] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== cpass) {
      setError('Confirm password not matched!');
      return;
    }

    try {
      const response = await authService.register({ name, email, password });
      setMessage(response.data);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Register Now</h3>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p className="empty">{error}</p>}
        <input
          type="text"
          name="name"
          required
          placeholder="enter your username"
          maxLength="20"
          className="box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          name="cpass"
          required
          placeholder="confirm your password"
          maxLength="20"
          className="box"
          value={cpass}
          onChange={(e) => setCPass(e.target.value)}
        />
        <input type="submit" value="register now" className="btn" name="submit" />
        <p>
          Already have an account? <Link to="/login" className="link">Login Now</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/search?q=${searchKeyword}`);
            setSearchKeyword('');
        }
    };

    return (
        <header className="header">
            <section className="flex">
                <Link to="/" className="logo">FU<span> DO</span></Link>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Menu</Link>
                    {user && <Link to="/orders">Orders</Link>}
                    <Link to="/about">About Us</Link> {/* Added Link */}
                    <Link to="/contact">Contact Us</Link>
                </nav>
                
                <form onSubmit={handleSearchSubmit} className="search-form" style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '5px', padding: '0.2rem 1rem' }}>
                    <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search products..." style={{ background: 'none', width: '150px' }}/>
                    <button type="submit" className="fas fa-search" style={{ background: 'none', color: 'var(--black)', cursor: 'pointer' }}></button>
                </form>

                <div className="icons" style={{display: 'flex', alignItems: 'center'}}>
                    <Link to="/wishlist" style={{fontSize: '2.5rem'}}><i className="fas fa-heart"></i></Link>
                    <Link to="/cart" style={{fontSize: '2.5rem'}}><i className="fas fa-shopping-cart"></i></Link>
                    {user ? (
                        <>
                            <Link to="/profile" style={{fontSize: '2.5rem'}}><i className="fas fa-user-edit"></i></Link>
                            <span style={{color: 'white', marginLeft: '1rem', fontSize: '1.6rem'}}>Hi, {user.name}</span>
                            <button onClick={handleLogout} className="option-btn" style={{marginLeft: '1rem', marginTop: '0'}}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="option-btn" style={{marginLeft: '1rem', marginTop: '0'}}>Login</Link>
                    )}
                </div>
            </section>
        </header>
    );
};

export default Header;
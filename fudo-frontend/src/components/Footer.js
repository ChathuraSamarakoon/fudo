import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <section className="grid">
                <div className="box">
                    <h3>Quick links</h3>
                    <Link to="/"> <i className="fas fa-angle-right"></i> Home</Link>
                    <Link to="/about"> <i className="fas fa-angle-right"></i> About</Link>
                    <Link to="/shop"> <i className="fas fa-angle-right"></i> Shop</Link>
                    <Link to="/contact"> <i className="fas fa-angle-right"></i> Contact</Link>
                </div>

                <div className="box">
                    <h3>Extra links</h3>
                    <Link to="/login"> <i className="fas fa-angle-right"></i> Login</Link>
                    <Link to="/register"> <i className="fas fa-angle-right"></i> Register</Link>
                    <Link to="/cart"> <i className="fas fa-angle-right"></i> Cart</Link>
                    <Link to="/orders"> <i className="fas fa-angle-right"></i> Orders</Link>
                </div>

                <div className="box">
                    <h3>Contact Us</h3>
                    <a href="tel:94716140179"><i className="fas fa-phone"></i> +94 716140179</a>
                    <a href="mailto:fudo@gmail.com"><i className="fas fa-envelope"></i> fudo@gmail.com</a>
                    <a href="https://www.google.com/myplace"><i className="fas fa-map-marker-alt"></i> Srilanka</a>
                </div>

                <div className="box">
                    <h3>Follow Us</h3>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a>
                </div>
            </section>

            <div className="credit"> Welcome To <span>FUDO</span> | Best Food Ordering Website</div>
        </footer>
    );
};

export default Footer;
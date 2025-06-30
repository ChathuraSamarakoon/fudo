import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <section className="about">
            <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div className="image" style={{ flex: '1 1 40rem' }}>
                    {/* Make sure this image exists in your public/images folder */}
                    <img src="/images/23.png" alt="About Fudo" style={{ width: '100%' }} />
                </div>
                <div className="content" style={{ flex: '1 1 40rem' }}>
                    <h3 style={{ fontSize: '3rem', color: '#e74c3c' }}>What Is Fudo</h3>
                    <p style={{ lineHeight: '2', fontSize: '1.5rem', color: '#666', padding: '1rem 0' }}>
                        Fudo is a leading Sri Lankan food delivery website that brings your favorite meals from local restaurants, home kitchens, and street food vendors right to your doorstep. Whether you’re craving a classic rice and curry, spicy kottu, or freshly made hoppers, Fudo offers a seamless and satisfying food delivery experience.
                    </p>
                    <h3>Contact:</h3>
                    <p style={{ lineHeight: '2', fontSize: '1.5rem', color: '#666', padding: '1rem 0' }}>
                        Hey There ! FUDO IS HERE. If you have any problem, We are here for you.
                    </p>
                    <Link to="/contact" className="btn">Contact Us</Link>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
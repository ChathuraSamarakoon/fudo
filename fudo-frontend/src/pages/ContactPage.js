import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import messageService from '../services/messageService';

const ContactPage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        number: '',
        message: ''
    });
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        try {
            await messageService.sendMessage(formData);
            setSuccessMsg('Message sent successfully!');
            setFormData({ name: '', email: '', number: '', message: '' }); // Clear form
        } catch (error) {
            console.error("Failed to send message", error);
            alert("Failed to send message.");
        }
    };

    return (
        <section className="contact">
            <form onSubmit={handleSubmit}>
                <h3>Get in touch</h3>
                {successMsg && <p style={{color: 'green', padding: '1rem', border: '1px solid green'}}>{successMsg}</p>}
                <input type="text" name="name" placeholder="enter your name" required className="box" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="enter your email" required className="box" value={formData.email} onChange={handleChange} />
                <input type="number" name="number" placeholder="enter your number" required className="box" value={formData.number} onChange={handleChange} />
                <textarea name="message" className="box" placeholder="enter your message" cols="30" rows="10" value={formData.message} onChange={handleChange}></textarea>
                <input type="submit" value="send message" name="send" className="btn" />
            </form>
        </section>
    );
};

export default ContactPage;
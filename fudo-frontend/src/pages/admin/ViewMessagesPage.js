import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const ViewMessagesPage = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const response = await adminService.getMessages();
        setMessages(response.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('Delete this message?')) {
            await adminService.deleteMessage(id);
            fetchMessages();
        }
    }

    return (
        <section className="contacts">
            <h1 className="heading">Messages</h1>
            <div className="box-container">
                {messages.map(msg => (
                    <div className="box" key={msg.id}>
                        <p> Name : <span>{msg.name}</span></p>
                        <p> Email : <span>{msg.email}</span></p>
                        <p> Number : <span>{msg.number}</span></p>
                        <p> Message : <span>{msg.message}</span></p>
                        <button onClick={() => handleDelete(msg.id)} className="delete-btn">Delete</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ViewMessagesPage;
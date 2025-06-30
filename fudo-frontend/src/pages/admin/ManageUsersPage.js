import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await adminService.getUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('Delete this user and all their related data (orders, cart, etc)?')) {
            await adminService.deleteUser(id);
            fetchUsers();
        }
    }

    return (
        <section className="accounts">
            <h1 className="heading">User Accounts</h1>
            <div className="box-container">
                {users.map(user => (
                    <div className="box" key={user.id}>
                        <p> User id : <span>{user.id}</span> </p>
                        <p> Username : <span>{user.name}</span> </p>
                        <p> Email : <span>{user.email}</span> </p>
                        <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageUsersPage;
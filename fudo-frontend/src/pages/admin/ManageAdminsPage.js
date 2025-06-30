import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import adminService from '../../services/adminService';

const ManageAdminsPage = () => {
    const [admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        const response = await adminService.getAdmins();
        setAdmins(response.data);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleDelete = async (id) => {
         if(window.confirm('Delete this admin?')) {
            await adminService.deleteAdmin(id);
            fetchAdmins();
        }
    }

    return (
        <section className="accounts">
            <h1 className="heading">Admin Accounts</h1>
            <div className="box-container">
                <div className="box">
                    <p>Add New Admin</p>
                    {/* Use Link component with a valid path */}
                    <Link to="/admin/register" className="option-btn">Register Admin</Link>
                </div>
                {admins.map(admin => (
                    <div className="box" key={admin.id}>
                        <p> Admin Id : <span>{admin.id}</span> </p>
                        <p> Admin name : <span>{admin.name}</span> </p>
                        <button onClick={() => handleDelete(admin.id)} className="delete-btn">Delete</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ManageAdminsPage;
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const DashboardPage = () => {
    return (
        <section className="dashboard">
            <h1 className="heading">Dashboard</h1>
            <div className="box-container">
                <div className="box">
                    <h3>Welcome!</h3>
                    <p>Admin Name</p>
                    {/* Use Link component with a valid path */}
                    <Link to="/admin/profile" className="btn">Update Profile</Link>
                </div>
                 <div className="box">
                    <h3>$0/-</h3>
                    <p>Total Pendings</p>
                    {/* Use Link component with a valid path */}
                    <Link to="/admin/orders" className="btn">See Orders</Link>
                </div>
                {/* Add other dashboard boxes here */}
            </div>
        </section>
    );
};

export default DashboardPage;
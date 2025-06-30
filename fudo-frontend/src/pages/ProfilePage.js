import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const ProfilePage = () => {
    const { user, login } = useAuth(); // We need login to update the context/localStorage after a change
    const [profileData, setProfileData] = useState({ name: user.name, email: user.email });
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
    
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await userService.updateUserProfile(user.id, profileData);
            // Re-run login to update user state everywhere
            login({ email: response.data.email, password: passwordData.oldPassword || 'dummy' }, true);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data || 'Failed to update profile.');
        }
    };
    
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await userService.updateUserPassword(user.id, passwordData);
            setMessage('Password updated successfully!');
            setPasswordData({ oldPassword: '', newPassword: '' });
        } catch (err) {
            setError(err.response?.data || 'Failed to update password.');
        }
    };

    return (
        <section className="form-container">
            {message && <p style={{ color: 'green', border: '1px solid green', padding: '1rem', marginBottom: '1rem' }}>{message}</p>}
            {error && <p className="empty">{error}</p>}

            <form onSubmit={handleProfileSubmit}>
                <h3>Update Profile</h3>
                <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} className="box" />
                <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="box" />
                <input type="submit" value="Update Profile" className="btn" />
            </form>

            <form onSubmit={handlePasswordSubmit} style={{marginTop: '2rem'}}>
                <h3>Change Password</h3>
                <input type="password" name="oldPassword" placeholder="Enter old password" value={passwordData.oldPassword} onChange={handlePasswordChange} className="box" />
                <input type="password" name="newPassword" placeholder="Enter new password" value={passwordData.newPassword} onChange={handlePasswordChange} className="box" />
                <input type="submit" value="Change Password" className="btn" />
            </form>
        </section>
    );
};

export default ProfilePage;
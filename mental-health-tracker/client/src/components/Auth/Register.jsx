import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import apiService from '../../services/apiService';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.register(formData);
            if (response.success) {
                toast.success('Registration successful!');
                login(response.user, response.token);
                navigate('/dashboard');
            } else {
                toast.error(response.message || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Create Account</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
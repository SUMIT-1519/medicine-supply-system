import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterDoctor() {
    const navigate = useNavigate();

    // State to hold form input data
    const [formData, setFormData] = useState({
        doctorName: '',
        email: '',
        username: '',
        password: '',
        specialty: '',
        contactNumber: '',
        address: '',
    });

    // State to hold errors
    const [errorMessages, setErrorMessages] = useState({});

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call to register the doctor
            const response = await axios.post('http://localhost:5000/doc/register', formData);

            if (response.data.success) {
                // If registration is successful, redirect to login or home page
                navigate('/logindoctor');
            } else {
                // Handle backend validation errors
                setErrorMessages({ message: response.data.message });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessages({ message: 'Registration failed. Please try again.' });
        }
    };

    return (
        <div className="register-wrapper">
            <h2>Doctor Registration</h2>
            <form onSubmit={handleSubmit} className="register-form">
                {/* Doctor Name */}
                <div className="form-group">
                    <label htmlFor="doctorName">Doctor Name:</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Username */}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Specialty */}
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        type="text"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Contact Number */}
                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Address */}
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Display error messages */}
                {errorMessages.message && (
                    <div className="error-message">{errorMessages.message}</div>
                )}

                {/* Submit Button */}
                <button type="submit" className="register-btn">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterDoctor;

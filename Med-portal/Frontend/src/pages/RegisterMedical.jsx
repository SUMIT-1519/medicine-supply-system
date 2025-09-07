import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterMedical() {
    const [medOwner, setMedOwner] = useState({
        ownerName: "",
        email: "",
        username: "", // Added field
        password: "",
        medicalStoreName: "",
        address: "",
        contactNumber: ""
    });
    const [errorMessages, setErrorMessages] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMedOwner(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("Sending registration data:", medOwner);
            
            const response = await axios.post('http://localhost:5000/medical/register', medOwner);
            if (response.status === 201) {
                // Registration successful, redirect or show a success message
                navigate("/loginmedical");
            }
        } catch (error) {
            console.error("Error registering:", error.response ? error.response.data : error.message);
            setErrorMessages({ message: error.response ? error.response.data.message : "Registration failed. Please try again." });
        }
    };

    const renderErrorMessage = () =>
        errorMessages.message && (
            <div className="error">{errorMessages.message}</div>
        );

    return (
        <div className="app">
            <div className="wrapper">
                <div className="logo">
                    <img src="https://images2.imgbox.com/e4/b4/H10WmipC_o.png" alt="" />
                </div>
                <div className="text-center mt-4 name">MEDICAL OWNER REGISTRATION</div>
                <form className="login" onSubmit={handleSubmit}>
                    <div className="login__field">
                        <input 
                            type="text" 
                            className="login__input" 
                            placeholder="Full Name" 
                            name="ownerName" 
                            value={medOwner.ownerName} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__field">
                        <input 
                            type="email" 
                            className="login__input" 
                            placeholder="Email" 
                            name="email" 
                            value={medOwner.email} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__field">
                        <input 
                            type="text" 
                            className="login__input" 
                            placeholder="Username" 
                            name="username" 
                            value={medOwner.username} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__field">
                        <input 
                            type="password" 
                            className="login__input" 
                            placeholder="Password" 
                            name="password" 
                            value={medOwner.password} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__field">
                        <input 
                            type="text" 
                            className="login__input" 
                            placeholder="Medical Store Name" 
                            name="medicalStoreName" 
                            value={medOwner.medicalStoreName} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__field">
                        <input 
                            type="text" 
                            className="login__input" 
                            placeholder="Address" 
                            name="address" 
                            value={medOwner.address} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="login__field">
                        <input 
                            type="text" 
                            className="login__input" 
                            placeholder="Contact Number" 
                            name="contactNumber" 
                            value={medOwner.contactNumber} 
                            required 
                            onChange={handleChange} 
                        />
                    </div>
                    {renderErrorMessage()}
                    <button className="btn mt-3">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterMedical;

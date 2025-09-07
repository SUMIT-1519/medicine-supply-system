import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMedical() {
    const [medicineName, setMedicineName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [expDate, setExpDate] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    // Get the logged-in medical owner's ID from localStorage
    const medicalOwnerId = localStorage.getItem("medicalOwnerId");
    console.log(medicalOwnerId);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!medicalOwnerId) {
            alert("You must be logged in to add a medical entry.");
            navigate("/loginmedical");
            return;
        }

        try {
            const meddata={
                name: medicineName,
                quantity: quantity,
                price: price,
                exp_date: expDate,
                description: description,
                ownerId: medicalOwnerId
            }
            console.log(meddata);
            const response = await axios.post("http://localhost:5000/med/add", {
                name: medicineName,
                quantity: quantity,
                price: price,
                exp_date: expDate,
                description: description,
                ownerId: medicalOwnerId // Pass the owner's ID here
            });

            if (response.status === 200) {
                alert("Medicine added successfully!");
                navigate("/meddashboard");
            }
        } catch (error) {
            console.error("Error adding medicine:", error);
            alert("Failed to add medicine.");
        }
    };

    return (
        <div className="add-medical">
            <h2>Add Medical Entry</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Medicine Name:</label>
                    <input
                        type="text"
                        value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiry Date:</label>
                    <input
                        type="date"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Add Medicine</button>
            </form>
        </div>
    );
}

export default AddMedical;

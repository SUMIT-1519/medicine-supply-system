// In your routes file, e.g., doctorRoutes.js
const express = require('express');
const router = express.Router();
const Doctor = require('../model/doctor');  // Import the Doctor model
// const bcrypt = require('bcrypt');

// Login route for doctor
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the doctor by username
        const doctor = await Doctor.findOne({ username });

        if (!doctor) {
            return res.status(404).json({ message: "Username not found" });
        }

        // Check if the password matches
        // const isMatch = await bcrypt.compare(password, doctor.password);
        if (password!==doctor.password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Send success response along with doctor info
        res.status(200).json({ success: true, doctor });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/register', async (req, res) => {
    const { doctorName, email, username, password, specialty, contactNumber, address } = req.body;

    try {
        // Check if doctor with this email or username already exists
        let existingDoctor = await Doctor.findOne({ $or: [{ email }, { username }] });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: 'Doctor with this email or username already exists.' });
        }

        // Hash password before saving to database
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new doctor
        const newDoctor = new Doctor({
            doctorName,
            email,
            username,
            password,
            specialty,
            contactNumber,
            address,
        });

        // Save doctor to the database
        await newDoctor.save();

        res.status(201).json({ success: true, message: 'Doctor registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
});


module.exports = router;

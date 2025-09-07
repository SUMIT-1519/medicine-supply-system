const express = require('express');
const router = express.Router();
const MedicalOwner = require('../model/medicalOwner'); // Your Mongoose model

// Register Medical Owner
router.post('/register', async (req, res) => {
    const { ownerName, email, username, password, medicalStoreName, address, contactNumber } = req.body;

    // Basic validation
    if (!ownerName || !email || !username || !password || !medicalStoreName || !address || !contactNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if email or username already exists
        const existingOwner = await MedicalOwner.findOne({ $or: [{ email }, { username }] });
        if (existingOwner) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        // Create new medical owner
        const newOwner = new MedicalOwner({ ownerName, email, username, password, medicalStoreName, address, contactNumber });
        await newOwner.save();

        res.status(201).json(newOwner);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: 'Error registering user' });
    }
});
// Login Medical Owner
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const owner = await MedicalOwner.findOne({ username, password });
        if (owner) {
            res.status(200).send(owner);
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

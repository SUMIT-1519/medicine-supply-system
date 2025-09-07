const mongoose = require('mongoose');

// Define the Doctor Schema
const DoctorSchema = new mongoose.Schema({
  doctorName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  specialty: { 
    type: String, 
    required: true 
  },
  contactNumber: { 
    type: String, 
    required: true 
  },
  // Add reference to prescriptions or patients if needed
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'  // Assuming there’s a Prescription model
  }],
  address: { 
    type: String, 
    required: true 
  },
  // Optional field to store any licenses or certifications

});

// Export the Doctor model
module.exports = mongoose.model('Doctor', DoctorSchema);

const mongoose = require('mongoose');

const MedicalOwnerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medicalStoreName: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  
  // Reference to medicines model
  medicines: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Medicine' // Updated to reference the correct model name
  }]
});

module.exports = mongoose.model('MedicalOwner', MedicalOwnerSchema);

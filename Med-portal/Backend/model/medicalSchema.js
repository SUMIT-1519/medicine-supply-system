const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    exp_date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    // purchase_date: {
    //     type: Date,
    //     default: Date.now
    // },
    // Adding ownerId to associate the medicine with the medical owner
    ownerId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'MedicalOwner',
        // required: true
        type: String,
        required: true

    }
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;

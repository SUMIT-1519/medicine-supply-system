const Prescription = require('../model/precription.model');
const MedicalOwner = require('../model/medicalOwner');
const Medicine = require('../model/medicalSchema');

exports.prebook = async (req, res) => {
  try {
    const { prescriptionId, storeId } = req.body;
    console.log( prescriptionId );
    console.log(storeId);  // Extract prescriptionId and storeId from the request body

    // Find the prescription by ID
    const prescription = await Prescription.findById(prescriptionId);
    console.log(prescription.doctor);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Fetch the store from the database
    const store = await MedicalOwner.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Update medicine quantities in the selected store based on the prescription
    
    for (let i = 0; i < prescription.med.length; i++) {
      const medicineItem = prescription.med[i];

      // Find medicine in the store's inventory
      const medInStore = await Medicine.findOne({
        ownerId: storeId,
        name: medicineItem.name
      });
      console.log(medicineItem.quantity);

      // Check if the medicine is available in the store and has enough quantity
      
        // Deduct the quantity from the store's inventory
        medInStore.quantity -= medicineItem.quantity;
        await medInStore.save();
      
    }

    // If some medicines are not available, notify the user
    

    // If all medicines are available and quantities are updated
    return res.status(200).json({
      message: 'Pre-booking successful. The medicine quantities have been deducted from the selected store.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

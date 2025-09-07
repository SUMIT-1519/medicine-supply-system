const Medicine=require('../model/medicalSchema');
const MedicalOwner=require('../model/medicalOwner');
const {filterMedByQty,filterMedByDate}=require('../middleware/medMiddleware');
exports.getAllMed=async (req,res)=>{
    try {

        const { medicalOwnerId} = req.params;
        
        // Find the medical owner and populate the 'medicines' array
        const ownerWithMedicines = await MedicalOwner.findById(medicalOwnerId).populate('medicines');
        
        if (!ownerWithMedicines) {
            return res.status(404).json({ message: 'Medical owner not found' });
        }
        
        // Return the owner and their medicines
        res.status(200).json(ownerWithMedicines.medicines);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching medicines' });
    }
}


exports.CreateMed = async (req, res) => {
    const { name, quantity, price, exp_date, description, ownerId } = req.body;

    try {
       
        // Create a new medicine
        const newMedicine = new Medicine({
            name,
            quantity,
            price,
            exp_date,
            description,
            ownerId
        });
        // Save medicine to the database
        await newMedicine.save();
        

        
        // Add the medicine to the medical owner's list of medicines
        await MedicalOwner.findByIdAndUpdate(ownerId, {
            $push: { medicines: newMedicine._id }
        });

        res.status(200).json({ message: 'Medicine added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add medicine', error });
    }
  };
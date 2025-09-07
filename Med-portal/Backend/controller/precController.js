const prescription=require('../model/precription.model')
const medicines=require('../model/medicalSchema')
const Doctor=require('../model/doctor')
exports.CreatePresc=async (req,res)=>{
    try {
        // Create a new prescription
        const presc = new prescription({
          name: req.body.name,
          doctorId:req.body.doctorId,
          doctor: req.body.doctor,
          email: req.body.email,
          med: req.body.med,
        });
        
        // Save the prescription to the database
        await presc.save();
        // Find the doctor by their email or username and update their prescriptions array
        const doctor = await Doctor.findOne({ _id: req.body.doctorId }); // Assuming doctorEmail is passed from frontend
        // await Doctor.findByIdAndUpdate(req.body.doctorId, {
        //     $push: { prescriptions: presc._id }
        // });
        // console.log("fxxd");

        if (!doctor) {
          return res.status(404).json({ message: "Doctor not found" });
        }
    
        doctor.prescriptions.push(presc._id); // Add the prescription ID to the doctor's prescriptions array
        await doctor.save(); // Save the updated doctor model
    
        // Respond with the created prescription
        res.status(200).json(presc);
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
}

exports.getPrescData=(req,res)=>{
    try{
        prescription.find()
            .then(pr=>{res.json(pr)})
    }catch(err){
        return res.status(400).json(err.message)
    }
}

exports.getPresc=async (req,res)=>{
    id = req.params.id
    const pr1=await prescription.findById(id)
    return res.status(200).json(pr1)
}

exports.orderMed=async (req,res)=>{
    try{
        id = req.params.id
        const pr1=await prescription.findById(id)
        pr1.med.map(async (item)=>{                                  //subtract quantity of ordered medicines from stock
            const filter={name:item.name};
            const update={ $inc: { quantity: -item.quantity } };
            await medicines.findOneAndUpdate(filter,update);
        })
        res.status(200).json({
            delivery:1
        });

    }catch(err){
        return res.status(400).json(err.message)
    }
}
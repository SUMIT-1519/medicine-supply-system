
// const prescription=require('../model/precription.model')

// const MedicalOwner = require('../model/medicalOwner'); // Import the MedicalOwner model
// const Medicine = require('../model/medicalSchema');

// exports.checkAvailability=async (req,res)=>{
//     try{
//         // var checked=true;
//         // const presc={                                 //add prescription to database
//         //     name:req.body.name,
//         //     doctor:req.body.doctor,
//         //     email:req.body.email,
//         //     med:req.body.med
//         // };
          
//         // for(i=0;i<presc.med.length;i++){
//         //     const item=presc.med[i];
//         //     const filter={name:item.name};
//         //     let medItem=await medicines.findOne(filter);
//         //     if(medItem.quantity<=item.quantity){
//         //         checked=false;
//         //         break;
//         //     }
//         // }

//         // console.log(checked)
//         // return res.status(200).json({
//         //     availability:checked
//         // });

  
    
//             const presc = {                               
//               name: req.body.name,
//               doctor: req.body.doctor,
//               email: req.body.email,
//               med: req.body.med // Array of medicines in the prescription
//             };
        
//             let availability = []; // Array to store availability status and stores for each medicine
        
//             for (let i = 0; i < presc.med.length; i++) {
//               const item = presc.med[i]; // Get each medicine in the prescription
//               const filter = { name: item.name }; // Find by medicine name
        
//               // Find all medicines with the same name across all stores
//               let medItems = await Medicine.find(filter);
        
//               // Filter stores that have the required quantity
//               let availableStores = medItems.filter(medItem => medItem.quantity >= item.quantity);
        
//               // If stores with sufficient quantity are found, get the store details
//               if (availableStores.length > 0) {
//                 let stores = [];
//                 for (let medItem of availableStores) {
//                   // Find the medical store (MedicalOwner) for each medicine using ownerId
//                   let owner = await MedicalOwner.findOne({ _id: medItem.ownerId });
        
//                   if (owner) {
//                     stores.push({
//                       storeId: owner._id,
//                       storeName: owner.medicalStoreName,
//                       storeAddress: owner.address,
//                       contactNumber: owner.contactNumber,
//                       availableQuantity: medItem.quantity
//                     });
//                   }
//                 }
        
//                 availability.push({
//                   medicine: item.name,
//                   stores: stores
//                 });
//               }
//             }
        
//             console.log(availability);
//             return res.status(200).json({
//               availability: availability.length > 0,
//               availableStores: availability // List of stores with required medicines
//             });
        
//           } catch (err) {
//             return res.status(400).json({ error: err.message });
//           }
// }



const MedicalOwner = require('../model/medicalOwner'); 
const Medicine = require('../model/medicalSchema');
const Prescription=require('../model/precription.model');
const Doctor = require('../model/doctor'); // Assuming there's a Doctor model to fetch hospital address
const axios = require('axios'); // You can use Axios to call the Geocoding API
const haversine = require('haversine-distance'); // You can install haversine-distance package
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Define your transporter to send the email
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.MAIL_ID, 
    pass: process.env.PASS 
  }
});

exports.checkAvailability = async (req, res) => {
  try {
    const presc = {
      name: req.body.name,
      doctorId: req.body.doctorId ,
      doctor: req.body.doctor,
      email: req.body.email,
      med: req.body.med
    };

    // Existing logic for checking availability and generating PDF
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    const hospitalAddress = doctor.address;
    const hospitalLocation = await getCoordinates(hospitalAddress);

    let availability = [];
    for (let i = 0; i < presc.med.length; i++) {
      const item = presc.med[i];
      const filter = { name: item.name };
      let medItems = await Medicine.find(filter);
      let availableStores = medItems.filter(medItem => medItem.quantity >= item.quantity);

      if (availableStores.length > 0) {
        let stores = [];
        for (let medItem of availableStores) {
          let owner = await MedicalOwner.findOne({ _id: medItem.ownerId });
          if (owner) {
            const storeAddress = owner.address;
            const storeLocation = await getCoordinates(storeAddress);
            const distance = haversine(hospitalLocation, storeLocation);
            stores.push({
              storeId: owner._id,
              storeName: owner.medicalStoreName,
              storeAddress: owner.address,
              contactNumber: owner.contactNumber,
              availableQuantity: medItem.quantity,
              distance: distance
            });
          }
        }
        stores.sort((a, b) => a.distance - b.distance);
        availability.push({
          medicine: item.name,
          stores: stores
        });
      }
    }

    // Generate the prescription PDF
    let pdfPath;
    if (availability.length > 0) {
      pdfPath = await generatePrescriptionPDF(presc, availability);
    }

    // Respond with the availability and PDF path
    return res.status(200).json({
      availability: availability.length > 0,
      availableStores: availability,
      pdfPath: pdfPath // Include PDF path in the response
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// Function to generate a PDF with prescription details
async function generatePrescriptionPDF(presc, availability) {
  const doc = new PDFDocument();
  const pdfPath = path.join(__dirname, '../prescriptions', `prescription_${Date.now()}.pdf`);
  
  // Pipe the PDF document to a file
  doc.pipe(fs.createWriteStream(pdfPath));

  // Add content to the PDF
  doc.fontSize(16).text('Prescription', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Patient Name: ${presc.name}`);
  doc.text(`Doctor: ${presc.doctor}`);
  doc.text(`Email: ${presc.email}`);
  doc.moveDown();
  
  doc.fontSize(14).text('Medicines:', { underline: true });
  presc.med.forEach((med, index) => {
    doc.text(`${index + 1}. ${med.name}, Quantity: ${med.quantity}`);
  });

  doc.moveDown();
  doc.fontSize(14).text('Available Stores:', { underline: true });
  availability.forEach(item => {
    doc.text(`Medicine: ${item.medicine}`);
    item.stores.forEach((store, idx) => {
      doc.text(`   Store ${idx + 1}: ${store.storeName}, Address: ${store.storeAddress}, Contact: ${store.contactNumber}, Distance: ${(store.distance / 1000).toFixed(2)} km`);
    });
    doc.moveDown();
  });

  // Finalize the PDF and end the stream
  doc.end();

  return pdfPath; // Return the path of the generated PDF
}

// Helper function to send email to the patient with the PDF attachment
async function sendAvailabilityEmail(patientEmail, availability, pdfPath) {
  let emailContent = `<h2>Medicine Availability</h2><p>Here is the list of available medical stores for your prescription:</p>`;
  
  availability.forEach(medItem => {
    emailContent += `<h3>Medicine: ${medItem.medicine}</h3><ul>`;
    medItem.stores.forEach(store => {
      emailContent += `<li>${store.storeName} - ${store.storeAddress} (Distance: ${(store.distance / 1000).toFixed(2)} km)</li>`;
    });
    emailContent += `</ul>`;
  });

  // Prepare the mail options
  const mailOptions = {
    from: process.env.MAIL_ID, 
    to: patientEmail, 
    subject: 'Medicine Availability Information and Prescription',
    html: emailContent, 
    attachments: [
      {
        filename: 'prescription.pdf', // File name for the attachment
        path: pdfPath, // Path to the generated PDF
        contentType: 'application/pdf'
      }
    ]
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${patientEmail}`);
  } catch (err) {
    console.error('Error sending email:', err.message);
  }
}


// Function to get coordinates from an address using OpenCage Geocoder API
async function getCoordinates(address) {
  try {
    console.log(address);
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: address,  // 'q' is the parameter for the query (address)
        key: '131335d3422448aebe65d15b17a3ebb3',  // Use your OpenCage API Key stored in the .env file
        limit: 1  // Limit to 1 result
      }
    });
    // console.log("ffff");

    if (response.data.results.length === 0) {
      throw new Error('No results found for the given address');
    }

    // Accessing latitude and longitude from the response
    const location = response.data.results[0].geometry;
    return {
      latitude: location.lat,
      longitude: location.lng
    };

  } catch (err) {
    console.error('Error fetching geolocation:', err.message);
    throw new Error('Unable to fetch geolocation');
  }
}


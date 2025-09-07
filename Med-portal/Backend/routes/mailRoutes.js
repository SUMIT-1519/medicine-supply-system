const express=require('express')

const {sendMail, sendDeliveryMail ,sendNotAvail,sendPrescriptionEmail}=require('../controller/mailController')

const router=express.Router();

// router.post('/',sendMail);
router.post('/', sendPrescriptionEmail);

// router.post('/delivered',sendDeliveryMail);

// router.post('/notAvail',sendNotAvail)

module.exports=router;
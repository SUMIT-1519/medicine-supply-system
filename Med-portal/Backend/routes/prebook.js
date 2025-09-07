const express=require('express')


const {prebook}=require('../controller/prebookController')

const router=express.Router();

// router.post('/',sendMail);
router.post('/', prebook);

module.exports = router;
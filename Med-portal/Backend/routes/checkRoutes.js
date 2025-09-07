const express=require('express')
const router=express.Router()

const {checkAvailability}=require('../controller/checkController')

router.post('/',checkAvailability)

module.exports=router;
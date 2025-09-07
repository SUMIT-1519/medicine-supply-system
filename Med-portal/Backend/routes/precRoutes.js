const express = require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const router = express.Router();

const {getPrescData,CreatePresc,getPresc, orderMed}=require('../controller/precController')
//POST a new prescription
router.post('/',CreatePresc);

router.get('/',getPrescData);

router.get('/:id',getPresc);

router.post('/order/:id',orderMed)
module.exports=router;
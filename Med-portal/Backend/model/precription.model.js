const mongoose = require("mongoose");

const prescriptionSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    doctorId:{
      type:String,
      required:true
    },
        doctor:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    med:[],//contains medName and quantity
    date:{
      type:Date,
      default:Date.now
    }
  }
);

const prescription = mongoose.model("prescription", prescriptionSchema);
module.exports = prescription;
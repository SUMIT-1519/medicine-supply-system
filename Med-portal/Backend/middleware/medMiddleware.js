const medicines=require('../model/medicalSchema');

exports.filterMedByQty=async()=>{
    await medicines.deleteMany({ quantity: { $lte: 0 } })
} 

exports.filterMedByDate=async()=>{
    await medicines.deleteMany({ exp_date: { $lte: Date.now() } })
}

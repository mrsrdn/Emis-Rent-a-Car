const mongoose=require("mongoose");

const adminBookingSchema = new mongoose.Schema({


car : {type : mongoose.Schema.Types.ObjectID, ref:'cars'},
sorumlu : {type : String},
tcNo :{type: String},
adSoyad: { type: String, default: '' },
ehliyet: {type : Boolean},
ehliyetNo: {type : String},
bookedTimeSlots : {
    from : {type : String},
    to : {type : String}
},
totalHours : {type : Number},
totalAmount : {type: Number},
guvenlikpaket : {type : Boolean},
teslimAlma : {type : String},
teslimEtme : {type : String},








},
{timestamps : true}
)
const adminBookingModel = mongoose.model('adminbookings', adminBookingSchema)
module.exports = adminBookingModel
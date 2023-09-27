const { string } = require("i/lib/util");
const mongoose=require("mongoose");

const bookingSchema = new mongoose.Schema({

car : {type : mongoose.Schema.Types.ObjectID, ref:'cars'},
user : {type : mongoose.Schema.Types.ObjectID, ref:'users'},
tcNo :{type: String},
adSoyad: {type : String},
ehliyet: {type : Boolean},
ehliyetNo:{type:String},
bookedTimeSlots : {
    from : {type : String},
    to : {type : String}
},
totalHours : {type : Number},
totalAmount : {type: Number},
transactionId : {type : String},
guvenlikpaket : {type : Boolean},
teslimAlma:{type:String},
teslimEtme:{type:String},








},
{timestamps : true}
)
const bookingModel = mongoose.model('bookings', bookingSchema)
module.exports = bookingModel
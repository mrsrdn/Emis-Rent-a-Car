const mongoose=require("mongoose");

const carSchema=new mongoose.Schema({

sorumlu : {type : String},//C# formdaki admin için geçerli
name:{type : String, required : true},
image:{type : String , required :true},
capacity:{type:Number,required:true},
aracSinif:{type:String,required:true},
trafikCikis:{type:String,required:true},
fuelType:{type:String,required:true},
sanziman:{type:String,required:true},
bookedTimeSlots:[
{
    from:{type:String,required:true},
    to:{type:String,required:true}
}

],

rentPerHour:{type:Number,required:true},
aciklama:{type:String,required:true}


},{timestamps:true}

)
const carModel=mongoose.model('cars',carSchema)
module.exports=carModel
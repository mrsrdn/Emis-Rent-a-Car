const mongoose=require("mongoose");
function connectedDB(){
    mongoose.connect('mongodb+srv://emreserdan061:d17XKoqSg9SS8CsS@cluster0.nmsqzwv.mongodb.net/emisss',{useUnifiedTopology: true ,UseNewUrlParser: true})
    const connection=mongoose.connection
connection.on('connected',()=>{
    console.log('MongoDB Connection Successfull')
})

connection.on('error',()=>{
    console.log('MongoDB connection Error')
})


}
connectedDB()
module.exports=mongoose
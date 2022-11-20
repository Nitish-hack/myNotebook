const mongoose=require('mongoose');
require('dotenv').config();
MONGODB_URI='mongodb+srv://incredible:inc123@cluster0.fvmcdp4.mongodb.net/myNotes'
const connectToMongo=()=>{
    mongoose.connect(MONGODB_URI,()=>{
console.log("connected to mongo successfully");
    })
}
module.exports=connectToMongo;

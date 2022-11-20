const mongoose=require('mongoose');
const NotesSchema=new mongoose.Schema({
//now we want to link notes with user so here we use a concept called foreign key , that is we are storing user id to uniquely identify an user

    user:{    
     type:mongoose.Schema.Types.ObjectId,           //syntax to store id of different schema
     ref:'user'
    },

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
}) 

module.exports=mongoose.model("note",NotesSchema);
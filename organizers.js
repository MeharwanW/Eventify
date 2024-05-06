
const mongoose = require("mongoose")


const organizersSchema=new mongoose.Schema({
    organizer_name: {
        type: "string",
        required: [true,"Please enter your name"]
    },
    organizer_email:{
        type:"string",
        required: true,
        unique:true
    },
    organizer_username:{
        type: "string",
        required: [true,"Please enter user name"],
        unique:true

    },
    organizer_password:{
        type: "string",
        required: true
        
    },
    organizer_phone:{
        type:"string",
        required: true,
        unique:true
        
    },
    user_type:{
        type: "string",
        required:true,
    }
   
   
},
{
    timestamps:true
})

const organizer  = mongoose.model("organizer",organizersSchema)

module.exports=organizer

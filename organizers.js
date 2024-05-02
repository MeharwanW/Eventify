
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
    organizer_password:{
        type: "string",
        required: true
        
    },
    organizer_cnic:{
        type: "string",
        required:true,
        unique:true
    },
    organizer_username:{
        type: "string",
        required: [true,"Please enter user name"],
        unique:true

    },
    organizer_phone:{
        type:"string",
        required: true,
        unique:true
        
    }
},
{
    timestamps:true
})

const organizer  = mongoose.model("organizers",organizersSchema)

module.exports=organizer

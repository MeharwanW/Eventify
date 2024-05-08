// const mongoose= require("mongoose")

// mongoose.connect("mongodb+srv://eventify:ibasukkur@backenddb.vx1pj6l.mongodb.net/Eventify-Backend?retryWrites=true&w=majority&appName=BackendDB")
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log('failed');
// })
const mongoose = require("mongoose")


const clientSchema=new mongoose.Schema({

    client_name: {
        type: "string",
        required: [true,"Please enter your name"]
    },
    client_email:{
        type:"string",
        required: true,
        unique:true
    },
    client_username:{
        type: "string",
        required: [true,"Please enter user name"],
        unique:true

    },
    client_password:{
        type: "string",
        required: true
        
    },
    client_phone:{
        type:"string",
        required: true,
       
        
    },
    user_type:{
        type: "string",
        required:true
        
        
    }
},
{
    timestamps:true
})

const client  = mongoose.model("client",clientSchema)

module.exports=client

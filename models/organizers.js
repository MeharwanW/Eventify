
const mongoose = require("mongoose")
//const autoIncrement = require('mongoose-auto-increment');

// Initialize the auto-increment plugin with your mongoose connection
//autoIncrement.initialize(mongoose.connection);


const organizersSchema=new mongoose.Schema({
    
    // organizer_id: {
    //     type: Number,
    //     unique: true,
    //     required: true
    // },
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


// Add the auto-increment plugin to your schema
//organizersSchema.plugin(autoIncrement.plugin, { model: 'organizer', field: 'organizer_id', startAt: 1 });
//organizersSchema.plugin(autoIncrement.plugin, 'organizer');



const organizer  = mongoose.model("organizer",organizersSchema)

module.exports=organizer

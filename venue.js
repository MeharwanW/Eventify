const mongoose = require("mongoose")

const venueSchema = new mongoose.Schema({

    venue_id: {
        type:"string",
        required:true
    },
    venue_category: {
        type:"string",
        required:true
    },
    venue_location: {
        type:"string",
        required:true
    },
    venue_type:{
        type:"string",
        required:true
    },
    no_of_guests:{
        type:"string",
        required:true
    }
},
{
    timestamps:true
})
const venue  = mongoose.model("venues",venueSchema)

module.exports=venue

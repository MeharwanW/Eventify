const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    organizer_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Organizer', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    date: { 
        type: Date, 
        required: true 
    },
    venue: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true 
    },
    zipcode: { 
        type: String,
         required: true 
        },
    category: { 
        type: String, 
        required: true 
    },
    ratings: { 
        type: Number, 
        default: 0 },
    number_of_guests: { 
        type: Number, 
        required: true },
    // Other event fields can be added here
});

const event  = mongoose.model("event",eventSchema)

module.exports=event

const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema({
  organizer_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  services_list: {
    type: [String], // Assuming services are represented as strings
    required: true,
  }, 
  no_of_guest:{
    type: Number,
    required:true
  },
  total_cost: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state1: {
    type: String,
    required: true,
  },
  image: {
    type: String, // File path where the image will be saved
    //required:true
  },
  clicks:{
    type:Number
  },
  date_created: {
    type: Date,
    default: Date.now,
  }

  // Other gig fields can be added here
},

{
    timestamps:true
});

const gig = mongoose.model("gig", gigSchema);

module.exports = gig;

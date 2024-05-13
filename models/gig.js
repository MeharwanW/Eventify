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
    type: [{
        name: String,
        price: Number
    }],
    required: true,
}, 
 
  total_cost: {
    type: Number,
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
    type: String, 
    required:true
  },
  organizer_image:{
    type:String
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

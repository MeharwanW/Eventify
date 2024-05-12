const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    event_date:{
        type:Date
    },
    venue: {
      type: String,
      required: true,
    },
    no_of_guest:{
      type:Number
    },
    city: {
      type: String,
      required: true,
    },
    state1: {
      type: String,
      required: true,
    },
    services: {
      type: [String], // Assuming services are represented as strings
      required: true,
    },
    total_cost: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    gig_id: {
        type: String,
        required: true,
    },
    organizer_id:{
        type: String,
        required: true,
    }
    
    
    
  },
  {
    timestamps: true,
  }
);



const order = mongoose.model("order", orderSchema);

module.exports = order;

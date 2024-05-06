const mongoose = require("mongoose")

const gigSchema = new mongoose.Schema({
    organizer_id: { type: Schema.Types.ObjectId, ref: 'Organizer', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    service_provider: [{ type: String }],
    date_created: { type: Date, default: Date.now },
    ratings: { type: Number, default: 0 },
    // Other gig fields can be added here
});

const gig  = mongoose.model("gig",gigSchema)

module.exports=gig

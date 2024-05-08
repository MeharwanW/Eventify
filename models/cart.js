const cartSchema = new Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    services: [{ type: String, required: true }], // Array of selected services
    event_id: { type: Schema.Types.ObjectId, ref: 'Event' }, // Reference to the event, optional
    gig_id: { type: Schema.Types.ObjectId, ref: 'Gig' }, // Reference to the gig, optional
    // Other cart fields can be added here
});

const cart = mongoose.model("cart",cartSchema)

module.exports=cart

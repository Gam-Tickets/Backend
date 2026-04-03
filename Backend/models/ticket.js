const mongoose = require('mongoose'); 

const ticketSchema = new mongoose.Schema({ 
    event: String, // Event name
    name: String, // Name of the person who booked the ticket
    price: Number, // Price of the ticket
    used: { // Whether the ticket has been used or not
        type: Boolean,
        default: false // Default value is false (not used)
    }
});

module.exports = mongoose.model('Ticket', ticketSchema); // Export the Ticket model based on the schema
// This model will be used to interact with the tickets collection in the MongoDB database
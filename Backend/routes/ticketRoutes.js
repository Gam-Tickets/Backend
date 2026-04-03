const express = require('express');
const router = express.Router(); //create a new router object
const Ticket = require('../models/ticket'); //load the Ticket model

router.post('/', async (req, res) => { 
    const ticket = new Ticket(req.body); //create a new ticket instance with the request body
    await ticket.save() //save the ticket to the database

    res.json(ticket); //send the saved ticket to the client
})


router.post('/verify', async (req, res) => {
     const ticket = await Ticket.findById(req.body.id); //find the ticket by ID
     if (ticket && !ticket.used) { //if ticket exists and not used
        ticket.used = true; //mark the ticket as used
        await ticket.save(); //save the updated ticket to the database
        return res.json({success: true}); //send success response
     }
    res.json({success:false}); //send failure response if ticket not found or already used

 }) ;

 router.get('/stats', async (req, res) => {
    const total = await Ticket.countDocuments();
    const used = await Ticket.countDocuments({ used: true });
    const revenue = await Ticket.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);
    res.json({
      total,
      used,
      revenue: revenue[0]?.total || 0
    });
 })

 module.exports = router; //export the router object to be used in other files
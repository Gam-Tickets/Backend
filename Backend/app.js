const express = require('express'); // Loads Express web framework
const mongoose = require('mongoose'); // Helps connect and interact with MongoDB
const cors = require('cors'); // Allows frontend to make requests to the backend
require('dotenv').config(); // Loads variables from .env file like database URI

const ticketRoutes = require('./routes/ticketRoutes'); // Load routes related to tickets

const app = express(); // Create Express app
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB using the URI from .env
mongoose.connect('mongodb+srv://Stackghost2:Stackghost2password@cluster0.oqep3uj.mongodb.net/ticketing_system'
  
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// All ticket-related routes will start with /api/tickets
app.use('/api/tickets', ticketRoutes);

// Start server on port 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const transactionRoutes = require('../Routes/TransactionRoutes');

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow CORS for all origins
app.use('/api',transactionRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vaibhaodaberao:Vaibhao%4096@cluster0.1uwcz.mongodb.net/')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
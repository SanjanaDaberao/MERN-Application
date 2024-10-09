const express = require('express');
const Transaction = require('../Models/Transaction');
const router = express.Router();
const axios = require('axios');

// Initialize the database with seed data
router.get('/initialize', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
});

// List transactions with search and pagination
router.get('/transactions', async (req, res) => {
  const { page = 1, perPage = 10, search = '', month } = req.query;
  const query = {
    dateOfSale: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) },
    $or: [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: new RegExp(search, 'i') }
    ]
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

module.exports = router;
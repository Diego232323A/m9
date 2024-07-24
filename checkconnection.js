const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const url = 'mongodb://localhost:27017'; // Define directamente la URL de conexión aquí

const client = new MongoClient(url);
let db;

app.get('/connect', async (req, res) => {
  try {
    await client.connect();
    db = client.db('hotel');
    res.status(200).send('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).send('Error connecting to MongoDB');
  }
});

app.get('/getDb', (req, res) => {
  if (db) {
    res.status(200).send('Database connection is active');
  } else {
    res.status(500).send('No active database connection');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ConexionMongo service is running on port ${PORT}`);
});

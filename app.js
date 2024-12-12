const express = require('express');
const dotenv = require('dotenv');
const connectToMongoDB = require('./server');

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Connect to MongoDB
let db;
connectToMongoDB()
    .then((database) => {
        db = database;
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Default route
app.get('/', (req, res) => {
    res.send('Hello, Azure!');
});

// API route to insert an item
app.post('/api/items', async (req, res) => {
    try {
        const itemData = req.body;
        const collection = db.collection('items');
        const result = await collection.insertOne(itemData);
        res.status(201).send({ message: 'Item inserted', result });
    } catch (error) {
        console.error('Error inserting item:', error);
        res.status(500).send({ error: 'Failed to insert item' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

// server.js 

const { MongoClient } = require('mongodb');

// Connect to the MongoDB server
async function connectToMongoDB() {
    // Create a new MongoClient
    const client = new MongoClient(process.env.MONGO_URI || process.env.AZURE_COSMOS_CONNECTIONSTRING);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;

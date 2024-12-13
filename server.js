const { MongoClient } = require('mongodb');

// Connect to the MongoDB server
async function connectToMongoDB() {
    // Determine the connection string
    const connectionString = process.env.AZURE_COSMOS_CONNECTIONSTRING || process.env.MONGODB_URI;

    if (!connectionString) {
        console.error("Error: No MongoDB connection string provided. Set AZURE_COSMOS_CONNECTIONSTRING or MONGODB_URI in your environment variables.");
        throw new Error("No MongoDB connection string provided.");
    }

    // Create a new MongoClient
    const client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the database object
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;

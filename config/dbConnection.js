const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if already connected (important for serverless)
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to MongoDB');
            return;
        }

        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected: ", 
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.log('MongoDB connection error:', err);
        // Don't exit in serverless environment
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorhandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 5001;

// Enable CORS for frontend integration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes")); // Simple contact routes (no auth)
// User routes removed - JWT authentication not needed for this assignment
// app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


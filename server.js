const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

// Connect to database
connectDB();

const app = express();

const port = process.env.PORT || 5001;

// Enable CORS for frontend integration
app.use(cors({
    origin: 'https://crmassignmentprateek.vercel.app', // Allow all origins for now - update with your frontend URL later
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root route for API health check
app.get("/", (req, res) => {
    res.json({ 
        message: "Contacts Manager API is running!",
        endpoints: {
            getAllContacts: "GET /api/contacts",
            createContact: "POST /api/contacts",
            getContact: "GET /api/contacts/:id",
            updateContact: "PUT /api/contacts/:id",
            deleteContact: "DELETE /api/contacts/:id"
        }
    });
});

app.use("/api/contacts", require("./routes/contactRoutes")); // Simple contact routes (no auth)
// User routes removed - JWT authentication not needed for this assignment
// app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// Only start server if not in production (Vercel handles this)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export for Vercel serverless
module.exports = app;


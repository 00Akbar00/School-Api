const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

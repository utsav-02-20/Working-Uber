const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');

const app = express();


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use('/user', userRoutes);

module.exports = app;
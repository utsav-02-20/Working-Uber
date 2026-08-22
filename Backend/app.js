const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const cookieParser = require('cookie-parser');
// route for users
const userRoutes = require('./routes/user.routes');
// route for captain
const captainRoutes = require("./routes/captain.routes");


const app = express();
app.use(cookieParser());


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
app.use("/captain", captainRoutes);

module.exports = app;
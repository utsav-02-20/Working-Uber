const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(cors());

// Route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

module.exports = app;
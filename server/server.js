const express = require("express");
const mongoose = require("mongoose");
const secureMern = require("secure-mern");
const path = require('path');

require("dotenv").config();

const app = express();

// Initialize Secure-MERN
secureMern(app);

// File serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
    res.send(`Server running on port ${process.env.PORT}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
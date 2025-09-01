const express = require("express");
const mongoose = require("mongoose");
const secureMern = require("secure-mern");
const path = require('path');

require("dotenv").config();

const adminRoute = require('./routes/admincotrolroute')
const projectRoute = require('./routes/projectRoute')
const internRoute = require('./routes/InternRoute')

const app = express();

// Initialize Secure-MERN
secureMern(app);

// File serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/admin', adminRoute)
app.use('/project', projectRoute)
app.use('/intern', internRoute)


app.get('/', (req, res) => {
    res.send(`Server running on port ${process.env.PORT}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
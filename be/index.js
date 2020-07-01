const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;


// CURERNTLY WORKING CODE BELOW
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

const todoRoutes = express.Router();
// Prefix all endpoint requests to start with '/todos'
app.use('/todos', todoRoutes)

/**
 * All the routes for creating a new item
 */
require('./controllers/main-routes')(todoRoutes);
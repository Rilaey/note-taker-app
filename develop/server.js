// node modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// port for local host
const PORT = 6999;

// turn app into a function
const app = express()

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route for index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// GET route for notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// alert for server start
app.listen(PORT, () => {
    console.log(`Server is live on ${PORT} 🥶`)
})
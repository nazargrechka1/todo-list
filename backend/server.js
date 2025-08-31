const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../frontend")));

app.get('/ping', (req, res) => {
    res.send('server is working')
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is running on ${PORT}`);
})
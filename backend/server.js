const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

const express = require('express');
const connectDB = require('./db.js');

const app = express();
const PORT = 3000;

const User = require('./models/user.js')

console.log('Mongo URI from server.js:', process.env.MONGO_URI);

connectDB()

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/ping', (req, res) => {
    res.send('server is working');
});

app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is running on ${PORT}`);
});
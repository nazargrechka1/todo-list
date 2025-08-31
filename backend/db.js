const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Підключення до MongoDB успішне! 🚀');
    } catch (err) {
        console.error('Помилка підключення до MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
import mongoose from "mongoose";
import config from "./config/config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Підключення до MongoDB успішне! 🚀');
    } catch (err) {
        console.error('Помилка підключення до MongoDB:', err.message);
        process.exit(1);
    }
};

export default connectDB;
import mongoose from "mongoose";
import config from "./config/config.js";
import readDb from "./fakeDb.js";

const connectDB = async () => {
  if (process.env.USE_JSON === "true") {
    const db = readDb();
    console.log("📂 Дані з JSON:", db);
    return db;
  }

  try {
    await mongoose.connect(config.mongoUri);
    console.log("Підключення до MongoDB успішне! 🚀");
  } catch (err) {
    console.error("Помилка підключення до MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;

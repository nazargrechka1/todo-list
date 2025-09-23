import mongoose from "mongoose";  

const connectDB = async () => {
  try {
    console.log("URI з .env:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Підключення до MongoDB успішне! 🚀");
  } catch (err) {
    console.error("Помилка підключення до MongoDB:", err.message);
    process.exit(1);
  }
  console.log("📂 Поточна БД:", mongoose.connection.db.databaseName);

};

export default connectDB;
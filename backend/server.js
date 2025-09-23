import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
console.log("🔑 MONGO_URI =", process.env.MONGO_URI);
import express from "express";
import { authRoutes } from "./routes/auth.js";
import config from "./config/config.js";
import connectDB from "./db.js";

export const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from "cors";
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/auth", authRoutes);
connectDB();
app.get("/ping", (req, res) => {
  res.send("server is working");
});

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server is running on port ${config.port}`);
});

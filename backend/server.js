import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import connectDB from "./db.js";
import { authRoutes } from "./routes/auth.js";
import config from "./config/config.js";

export const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/auth", authRoutes);

app.get("/ping", (req, res) => {
  res.send("server is working");
});

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server is running on port ${config.port}`);
});

export default __filename

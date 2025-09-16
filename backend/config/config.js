import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/todoapp",
  jwtSecret: process.env.JWT_SECRET || "fallback_secret", 
};

export default config;
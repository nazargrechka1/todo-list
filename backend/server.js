import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import express from 'express';
import connectDB from './db.js';
import authRoutes from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 
const app = express();
const PORT = 3000;

connectDB()

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/auth', authRoutes);

app.get('/ping', (req, res) => {
    res.send('server is working');
});



app.listen(PORT, '0.0.0.0', () => {
    console.log(`server is running on ${PORT}`);
});
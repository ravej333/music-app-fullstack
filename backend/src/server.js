import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './api/index.js';

// Load environment variables from .env
dotenv.config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 9090;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---
app.use('/api', apiRoutes);


// --- NEW: ADD THIS CODE BLOCK ---
// This creates a "welcome" route for the root URL
app.get('/', (req, res) => {
  res.status(200).json({ message: '🚀 VibeStream backend is running successfully!' });
});
// ---------------------------------


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
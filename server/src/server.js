import 'dotenv/config';
import express from 'express';
import billRoutes from './routes/billRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database.
connectDB();

// Use the routes.
app.use('/api/bills', billRoutes);

// Start the server.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
import 'dotenv/config';
import express from 'express';
import billRoutes from './routes/billRoutes.js';
import { connectDB } from './config/mongo.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware.
app.use(express.json()); // JSON request parsing for req.body.
app.use(rateLimiter); // Rate limiter.
app.use('/api/bills', billRoutes); // Routes.

// Connect to the database, then start the server.
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
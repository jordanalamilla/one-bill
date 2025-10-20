import 'dotenv/config';
import express from 'express';
import billRoutes from './routes/billRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware.
app.use(express.json()); // Allow JSON request parsing for use in req.body
app.use('/api/bills', billRoutes); // Use the routes.

// Connect to the database, then start the server.
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
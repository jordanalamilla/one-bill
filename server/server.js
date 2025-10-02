import 'dotenv/config';
import express from 'express';
import billRoutes from './src/routes/billRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.use('/api/bills', billRoutes);

// Start the server.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
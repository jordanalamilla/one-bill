import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.get('/api', (req, res) => {
    res.status(200).send("This is the api page. Sorry I'm naked, you're pretty early.");
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
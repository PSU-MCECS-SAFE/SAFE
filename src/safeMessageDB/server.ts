import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { messageDBConnect } from './messageDBConnect';
const cors = require('cors');


// // Create a new PostgreSQL connection pool
// const pool = new Pool({
//     user: 'haosheng',
//     password: 'pw3m3pb#Dp',
//     host: 'db.cecs.pdx.edu',
//     database: 'haosheng',
//     port: 5432,
//     ssl: { rejectUnauthorized: false }, // only use this option for development purposes
// });

// Create a new Express app
const app = express();
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// });
/**
 * Commenting out since we are working on sender now. We will use get method later in future development
 * 
 */
// Define an endpoint for retrieving all events
app.get('/message', async (req: Request, res: Response) => {
    try {
        // Acquire a client connection from the connection pool
        const client = await messageDBConnect.connect();

        // Execute a SQL query to retrieve all events
        const result = await client.query('SELECT * FROM "Message"');
        res.json(result.rows);
        // Release the client connection back to the pool
        client.release();
        // Send the results as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define an endpoint for adding a new event
app.post('/addMessage', async (req: Request, res: Response) => {
    const { title, receiver_name, message, code, receive_reply, has_been_read, time_submitted } = req.body;


    try {
        // Acquire a client connection from the connection pool
        const client = await messageDBConnect.connect();

        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Execute a SQL query to insert a new event
        const result = await client.query(
            'INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [title, receiver_name, message, code, receive_reply, has_been_read, time_submitted]
        );

        // Release the client connection back to the pool
        client.release();

        // Send the inserted event as JSON
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
app.listen(3001, () => {
    console.log(`Server listening on port 3001`);
});

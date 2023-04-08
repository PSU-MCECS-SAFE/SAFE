import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { env } from 'process';
import bodyParser from 'body-parser';

// Create a new PostgreSQL connection pool
const pool = new Pool({
  user: 'haosheng',
  password: 'pw3m3pb#Dp',
  host: 'db.cecs.pdx.edu',
  database: 'haosheng',
  port: 5432,
  ssl: { rejectUnauthorized: false }, // only use this option for development purposes
});

// Create a new Express app
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/**
 * Commenting out since we are working on sender now. We will use get method later in future development
 * 
 */
// Define an endpoint for retrieving all events
// app.get('/message', async (req: Request, res: Response) => {
//   try {
//     // Acquire a client connection from the connection pool
//     const client = await pool.connect();

//     // Execute a SQL query to retrieve all events
//     const result = await client.query('SELECT * FROM "Message"');
//     res.json(result.rows);
//     // Release the client connection back to the pool
//     client.release();
//     // Send the results as JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Define an endpoint for adding a new event
app.post('/addMessage', async (req: Request, res: Response) => {
  const { title, receiver, message, code, reply, read } = req.query;

  try {
    // Acquire a client connection from the connection pool
    const client = await pool.connect();

    // Execute a SQL query to insert a new event
    const result = await client.query(
      'INSERT INTO "Message" (title, receiver, message, code, reply, read) VALUES ($1, $2, $3, $4, $5, $6)',
      [title, receiver, message, code, reply, read]
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
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// // Start the server
// const hostname = 'web.cecs.pdx.edu/~haosheng/SAFE/build/';
// const port = 80;

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
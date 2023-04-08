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
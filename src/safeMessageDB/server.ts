import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { messageDBConnect } from './messageDBConnect';
import { spawn } from 'child_process';
import {
  safeJSONProps as sjp,
  getConfigProp,
  safeConfigPath as scp,
} from '../safeUtil/Util';
import { Code } from '../safeUtil/generateCode';

// Create a new Express app
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

/**
 * Commenting out since we are working on sender now. We will use get method later in future development
 */
// Define an endpoint for retrieving all events
// app.get('/message', async (req: Request, res: Response) => {
//     try {
//         // Acquire a client connection from the connection pool
//         const client = await messageDBConnect.connect();

//         // Execute a SQL query to retrieve all events
//         const result = await client.query('SELECT * FROM "Message"');
//         res.json(result.rows);
//         // Release the client connection back to the pool
//         client.release();
//         // Send the results as JSON
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

app.delete('/delete', async (req: Request, res: Response) => {
  const { code } = req.body;
  try{
    // Acquire a client connection from the connection pool
    const client = await messageDBConnect.connect();
    // Execute a SQL query to insert a new event
    await client.query(
      'DELETE FROM "Message" WHERE code = $1',
      [
        code
      ]
    );
    // Release the client connection back to the pool
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint for retrieving all events
app.all('/query', async (req: Request, res: Response) => {
  const { query } = req.body;

  try {
    // Acquire a client connection from the connection pool
    const client = await messageDBConnect.connect();

    // Execute a SQL query to retrieve all events
    const result = await client.query('$1', [ query ]);
    // Release the client connection back to the pool
    client.release();
    // Send the results as JSON
    res.json(result.rows).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint for adding a new event
app.post('/addMessage', async (req: Request, res: Response) => {
  const {
    title,
    receiver_name,
    message,
    code,
    receive_reply,
    has_been_read,
    time_submitted,
    message_replied,
  } = req.body;

  try {
    // Acquire a client connection from the connection pool
    const client = await messageDBConnect.connect();

    // Execute a SQL query to insert a new event
    await client.query(
      'INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted, message_replied) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        title,
        receiver_name,
        message,
        code,
        receive_reply,
        has_been_read,
        time_submitted,
        message_replied,
      ]
    );

    // Release the client connection back to the pool
    client.release();

    // Send notification email to receiver
    const mailArgs = [`-s "${title}"`, getConfigProp(sjp.rcvr_email, scp)];
    const mail = spawn('mail', mailArgs);
    mail.stdin.write(message);
    mail.stdin.end();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//This post request endpoint is only for testing purpose
app.post('/addMessageTest', async (req: Request, res: Response) => {
  const {
    title,
    receiver_name,
    message,
    code,
    receive_reply,
    has_been_read,
    time_submitted,
    message_replied,
  } = req.body;

  try {
    // Acquire a client connection from the connection pool
    const client = await messageDBConnect.connect();

    // Execute a SQL query to insert a new event
    client.query(
      'INSERT INTO "TestMessage" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted, message_replied) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        title,
        receiver_name,
        message,
        code,
        receive_reply,
        has_been_read,
        time_submitted,
        message_replied,
      ]
    );

    // Release the client connection back to the pool
    res.status(200).send();
    messageDBConnect.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log(`Server listening on port 3001`);
});

export default app;

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
import xss from 'xss';

import { Code } from '../safeUtil/generateCode';
import { PoolClient, QueryResult } from 'pg';
import { checkString } from './verifyString';

// Create a new Express app
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//only recommended for development environments.
app.use(cors());

async function execQuery(req: Request, res: Response, query: string, result: any | any[] = null) {
  try {
    // Acquire a client connection from the connection pool
    const client: PoolClient = await messageDBConnect.connect();

    // Execute SQL query
    result = (result) ? result : await client.query(query);

    // If no messages are returned
    if ((<QueryResult>result).rows.length && result.rows.length === 0) {
      res.status(404).json({ error: 'No results from query' });
    } else {
      // Return all the returned messages
      res.status(200).json(result.rows);
    }
    // Release the client connection back to the pool
    client.release();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Internal server error, please try back later' });
  }
}

// Define an endpoint for retrieving all messages with it's all info
app.get('/getallmessages', async (req: Request, res: Response) => {
  // Execute a SQL query to retrieve all messages
  await execQuery(req, res, 'SELECT * FROM "Message"');
});

// Define an endpoint for deleting a message
app.delete('/deletemessage', async (req: Request, res: Response) => {
  const { code } = req.query;

  // Execute a SQL query to retrieve a paticular message based on code
  const query: string = 'DELETE FROM "Message" WHERE code = ${code};';

  execQuery(req, res, query, "Message deleted");
});

// Define an endpoint for retrieving one message
app.get('/getmessage', async (req: Request, res: Response) => {
  const { code } = req.query;
  // Execute a SQL query to retrieve one message
  await execQuery(req, res, 'SELECT message, message_reply FROM "Message" WHERE code = ' + code + ' ORDER BY time_submitted DESC;');
});

// Define an endpoint for adding reply to the message
app.post('/addReply', async (req: Request, res: Response) => {
  const { code, reply } = req.body;

  try {
    // Acquire a client connection from the connection pool
    const client = await messageDBConnect.connect();
    // Execute a SQL query to insert a new message
    await client.query(
      'UPDATE "Message" SET message_reply = $1 WHERE code = $2;',
      [reply, code]
    );
    // Release the client connection back to the pool
    await client.release();

    res.status(200); //we use this to test if user can get back the code from server
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint for setting receive_reply to true
app.post('/setReply', async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    // Acquire a client connection from the connection pool
    const client = await messageDBConnect.connect();
    // Execute a SQL query to insert a new message
    await client.query(
      'UPDATE "Message" SET receive_reply = true WHERE code = $1',
      [code]
    );
    // Release the client connection back to the pool
    await client.release();

    res.status(200); //we use this to test if user can get back the code from server
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint for emailing code to sender
app.post('/receiverEmail', async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    // Send notification email to sender
    const mailArgs = [`-s SAFE- This is a copy of your Code`, email];
    const mail = spawn('mail', mailArgs);
    mail.stdin.write(
      `Here is a copy of your unqiue code: ${code} \n please check back later in the website with reply. https://feedback.cs.pdx.edu`
    );
    mail.stdin.end();

    res.status(200).send(`Your code had been sent to the email you provied`); //we use this to test if user can get back the code from server
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint for adding a new message
// This is a POST request to post data into the database
app.post('/addMessage', async (req: Request, res: Response) => {
  //get all data from the request body and store them into these object
  const {
    title,
    receiver_name,
    message,
    receive_reply,
    has_been_read,
    time_submitted,
    message_reply,
  } = req.body;

  // Sanitize all properties of the req.body object
  const sanitizedBody = {
    title: xss(title),
    message: xss(message),
    message_reply: xss(message_reply),
  };

  //replace anything that is not a letter, number, '-', or '/'
  const sanitizedTitle = sanitizedBody.title.replace(/[^a-zA-Z0-9\s/-]/g, '');
  const time = new Date();

  let analysis_result: string | number;
  try {
    analysis_result = checkString(message);
  } catch (e: any) {
    return res
      .status(205)
      .json({ error: 'Invalid message: message contains profanities' });
  }
  if (analysis_result < 0) {
    analysis_result = 'negative';
  } else if (analysis_result === 0) {
    analysis_result = 'neutral';
  } else if (analysis_result > 0) {
    analysis_result = 'positive';
  } else {
    analysis_result = 'unknown';
  }

  try {
    // Acquire a client connection from the connection pool
    // it will return the db.pool from the connect() function
    const client = await messageDBConnect.connect();
    const msg_code = await Code.genCode(client);
    // Execute a SQL query to insert a new message
    await client.query(
      //using this type of Value array to keep us away from malicious actions
      'INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted, message_reply, sentiment_analysis) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        sanitizedTitle,
        receiver_name,
        sanitizedBody.message,
        msg_code,
        receive_reply,
        has_been_read,
        time,
        sanitizedBody.message_reply,
        analysis_result,
      ]
    );
    // Release the client connection back to the pool
    await client.release();

    // Send notification email to receiver
    const mailArgs = [
      `-s "[SAFE FEEDBACK] - (${sanitizedTitle})"`,
      getConfigProp(sjp.rcvr_email, scp), //get email address from Config
    ];
    //send out email using spawn to create a child process in terminal
    const mail = spawn('mail', mailArgs);
    mail.stdin.write(
      `This is a notification that you have received a message from SAFE at ${time}.\n\n\n` +
        `Subject: ${sanitizedTitle}\n\n` +
        'Message:\n' +
        sanitizedBody.message
    );
    mail.stdin.end();

    //status 200 to indicate success. This 'send' here can put different type of respond data
    //and it will be able to let the fetch part to catch the data you want to return back to
    //the UI part. e.g. The unique code of the message
    res.status(200).send(`${msg_code}`); //we use this to test if user can get back the code from server
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
// The IP address belongs to the rita.cecs.pdx.edu, hence the port here is unique,
// if someone else is using a paticular port, you will need to change both server
// and UI part of the port.
const port = 3001;
app.listen(port, '131.252.208.28', () => {
  console.log(`Server listening on port ${port}`);
});

export default app;

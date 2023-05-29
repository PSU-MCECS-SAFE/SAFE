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

// Create a new Express app
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// /**
//  * Commenting out since we are working on sender now. We will use get method later in future development
//  */
// // Define an endpoint for retrieving all events
// app.get('/message', async (req: Request, res: Response) => {
//   try {
//     // Acquire a client connection from the connection pool
//     const client = await messageDBConnect.connect();

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
// This is a POST request to post data into the database
app.post('/addMessage', async (req: Request, res: Response) => {
  //get all data from the request body and store them into these object
  const {
    title,
    receiver_name,
    message,
    code,
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

  try {
    // Acquire a client connection from the connection pool
    // it will return the db.pool from the connect() function
    const client = await messageDBConnect.connect();

    // Execute a SQL query to insert a new event
    await client.query(

      //using this type of Value array to keep us away from malicious actions

      'INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted, message_reply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        sanitizedTitle,
        receiver_name,
        sanitizedBody.message,
        code,
        receive_reply,
        has_been_read,
        time,
        sanitizedBody.message_reply,
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
    mail.stdin.write(`This is a notification that you have received a message from SAFE at ${time}.\n\n\n` + `Subject: ${sanitizedTitle}\n\n` + "Message:\n" + sanitizedBody.message);
    mail.stdin.end();
    //status 200 to indicate success. This 'send' here can put different type of respond data
    //and it will be able to let the fetch part to catch the data you want to return back to
    //the UI part. e.g. The unique code of the message
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3001, '127.0.0.1', () => {
  console.log(`Server listening on port 3001`);
});

export default app;

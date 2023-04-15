import { messageDB } from '../safeMessageDB/messageDB';
import { messageDBConnect } from '../safeMessageDB/messageDBConnect';

test('Message DB connection testing', async () => {
  await messageDBConnect.connect();
  const result = await messageDBConnect.query('SELECT * FROM "Message"');
  expect(result.rows.length).toBeGreaterThan(0);
  messageDBConnect.end();
});

// describe('PostgreSQL database connection', () => {
//   let client: any;
//   let insert = new messageDB();

//   // Message DB connection testing
//   it('should be able to query the "Message" table', async () => {
//     client = await messageDBConnect.connect();
//     const result = await client.query('SELECT * FROM "Message"');
//     expect(result.rows.length).toBeGreaterThan(0);
//     await client.release();
//   });

//   // Insert data object to database
//   it('should be able to insert to the the "Message" table', async () => {
//     const title = 'Testing';
//     const receiver_name = 'John';
//     const message = 'string';

//     // will add them to testing in next sprint
//     const code = null;
//     const receive_reply = null;
//     const has_been_read = null;
//     const time_submitted = null;

//     insert.addMessage(title, receiver_name, message);
//     const result = await client.query(
//       'SELECT * FROM "Message" ORDER BY time_submitted DESC LIMIT 1'
//     );
//     expect(result.rows.length).toBe(1);
//     expect(result.rows[0].title).toEqual('Testing');
//     expect(result.rows[0].receiver_name).toEqual('John');
//     expect(result.rows[0].message).toEqual('string');
//   });
// });

import request from 'supertest';
// Import the Express app
import app from '../../JSoutFile/safeMessageDB/server';

// // Define a test suite for the /addMessage endpoint
// describe('Server Testing', () => {
//   let server: any;

//   //start the server
//   beforeAll((done: jest.ProvidesCallback) => {
//     server = app.listen(done);
//   });

//   //close the server
//   afterAll((done: jest.ProvidesCallback) => {
//     server.close(done);
//   });

//   test('should add a new message to TestMessage Table', async () => {
//     const newMessage = {
//       title: 'Test message',
//       receiver_name: 'John',
//       message: 'This is a test message',
//       code: Date.now(),
//       receive_reply: true,
//       has_been_read: false,
//       time_submitted: '2023-04-21T12:00:00.000Z',
//       message_replied: false,
//     };
//     // Use Supertest to send a mock HTTP request to the /addMessage endpoint
//     const response = await request(app)
//       .post('/addMessageTest')
//       .send(newMessage)
//       .expect(200);
//     // Verify that the response is empty
//     expect(response.body).toEqual({});
//   });
// });

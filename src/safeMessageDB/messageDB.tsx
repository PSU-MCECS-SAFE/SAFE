import { messageDBConnect } from './messageDBConnect';
import { Message } from './safeMessage/safeMessage';

export class messageDB {
  public async addMessage(message: Message) {
    try {
      await messageDBConnect.connect();

      const query = `INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const values = [message.title, message.receiver_name, message.message, null, null, null, null];

      await messageDBConnect.query(query, values);
      console.log('Data inserted successfully');
    } catch (err) {
      console.error(err);
    } finally {
      await messageDBConnect.end();
    }
  }
}

// async function getMessage() {
//   try {
//     await messageDBConnect.connect();
//     const result = await messageDBConnect.query('SELECT * FROM "Message"');
//     result.rows.forEach(row => {
//       console.log(result.rows);
//     });
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await messageDBConnect.end();
//   }
// }
export default messageDB;
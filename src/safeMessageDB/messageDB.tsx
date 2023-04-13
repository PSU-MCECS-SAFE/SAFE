import { messageDBConnect } from './messageDBConnect';

export class messageDB {
  public async addMessage(title: string, receiver_name: string, message: string) {
    try {
      await messageDBConnect.connect();

      const query = `INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      const values = [title, receiver_name, message, null, null, null, null];

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
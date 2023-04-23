import { messageDBConnect } from './messageDBConnect';
import Client from 'ts-postgres';
import { ResultRow } from 'ts-postgres/dist/src/result';

export class messageDB {
  public async addMessage(
    title: string,
    receiver_name: string,
    message: string
  ) {
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

  /**
   * Connect to Database and run query
   * @param query - string containing query to be made
   */
  public static async getMessage(query: string): Promise<ResultRow<Client.Value>[]> {
    // Connect to DB
    var client = new Client.Client({ host: 'localhost' });
    await client.connect();

    // Get Query and make each row an element in an array
    var result_iterable = await client.query(query);

    // Close DB
    client.end();

    // Convert object iterable to array of objects
    var msgs = [...result_iterable];

    if (msgs.length < 1) {
      throw new Error('No messages in database query');
    }

    return msgs;
  }

  /**
   * Checks if there was a response to feedback given from user
   * @param code - Unique code given to user to identify their original message
   */
  public static async checkReply(code: string): Promise<boolean> {
    var thread: ResultRow<Client.Value>[] = await messageDB.getThread(code);
    return (thread[0].get("receiver_name") !== thread[thread.length - 1].get("receiver_name"));
  }

  /**
   * Retrieves feedback/reply thread
   * @param code - Unique code given to user to identify their original message
   */
  public static async getThread(code: string): Promise<ResultRow<Client.Value>[]> {
    return messageDB.getMessage("SELECT * FROM messages WHERE code = " + code + " ORDER BY time_submitted DESC");
  }
}

export default messageDB;

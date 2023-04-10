import Client from 'ts-postgres'
import Message from './SafeMessage'
import { ResultRow } from 'ts-postgres/dist/src/result';

/**
 * Connect to Database and run query
 * @param query - string containing query to be made
 */
async function psql_to_Message(query: string) : Promise<Message[]> {
    // Connect to DB
    var client = new Client.Client({"host": "localhost"});
    await client.connect();

    // Get Query and make each row an element in an array
    var result_iterable = await client.query(query);
    var msgs = [...result_iterable];

    // Close DB
    client.end();

    // Convert DB results to Message
    return psql_create_Messages(msgs);
}

/**
* Parser for the `Message` class object from PostgreSQL query
* @param msgs - PostgreSQL query results in an array
*/
function psql_create_Messages(msgs: ResultRow<Client.Value>[]) : Message[] {
    // Verify there is at least one entry
    if (msgs.length < 1) {
        throw new Error("No messages in database query");
    }

    // Return Message objects from data in DB entry
    var messages: Message[] = [];
    for(const msg of msgs){
        let title = msg.get('title') as string;
        let receiver_name = msg.get('receiver_name') as string;
        let message = msg.get('message') as string;
        let code = msg.get('code') as string;
        let receive_reply = msg.get('receive_reply') as boolean;
        let has_been_read = msg.get('has_been_read') as boolean;
        let time_submitted = msg.get('time_submitted') as Date; // Will probably break, untested

        messages.push(new Message(title, receiver_name, message, code, receive_reply, has_been_read, time_submitted));
    }
    return messages;
}
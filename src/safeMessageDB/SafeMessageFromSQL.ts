import Client from 'ts-postgres'
import { ResultRow } from 'ts-postgres/dist/src/result';
import { messageDBConnect } from './messageDBConnect';

function genCode() : string {
    return "a";
}

async function insertMessage(title: string, receiver_name: string, message: string){
    try {
        await messageDBConnect.connect();

        let val = [title, receiver_name, message, genCode(), "false", "false", Date.now()].join(", ");
        let query = "INSERT INTO Message VALUES (" + val + ");";

        await messageDBConnect.query(query);

        console.log("Data inserted successfully");
    } catch (err) {
        console.log(err);
    } finally {
        await messageDBConnect.end();
    }
}

/**
 * Connect to Database and run query
 * @param query - string containing query to be made
 */
async function getMessage(query: string) : Promise<ResultRow<Client.Value>[]>{
    // Connect to DB
    var client = new Client.Client({"host": "localhost"});
    await client.connect();

    // Get Query and make each row an element in an array
    var result_iterable = await client.query(query);

    // Close DB
    client.end();

    // Convert object iterable to array of objects
    var msgs = [...result_iterable];

    if(msgs.length < 1){
        throw new Error("No messages in database query");
    }

    return msgs;
}
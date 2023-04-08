import postgres from 'postgres'
import Message from './SafeMessage'

/**
* Parser for the `Message` class object from PostgreSQL query
* @param psql_msg - The message from a PostgreSQL query
*/
function parse_psql(psql_msgs: Array<Object>) : Message {
    if (psql_msgs.length != 1) {
        var amount: string = (psql_msgs.length < 1) ? "No" : "Too many";
        throw new Error(amount + " messages in database query");
    }
    var msg = psql_msgs[0];
    return new Message(msg.title, msg.receiver_name, msg.message);
}
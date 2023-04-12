import { messageDB } from '../safeMessageDB/messageDB';
import { messageDBConnect } from '../safeMessageDB/messageDBConnect';


describe('PostgreSQL database connection', () => {
    let client: any;
    let insert = new messageDB();

    beforeAll(async () => {
        client = await messageDBConnect.connect();
    });

    afterAll(async () => {
        await client.release();
    });

    // Message DB connection testing 
    it('should be able to query the "Message" table', async () => {
        const result = await client.query('SELECT * FROM "Message"');
        expect(result.rows.length).toBeGreaterThan(0);
    });


    // Insert data object to database
    it('should be able to insert to the the "Message" table', async () => {
        const message = {
            title: "Testing",
            receiver_name: "John",
            message: "string",
            code: "",
            receive_reply: false,
            has_been_read: false,
            time_submitted: new Date()
        };
        insert.addMessage(message);
        const result = await client.query(
            'SELECT * FROM "Message" ORDER BY time_submitted DESC LIMIT 1'
        );
        expect(result.rows.length).toBe(1);
        expect(result.rows[0].title).toEqual("Testing");
        expect(result.rows[0].receiver_name).toEqual("John");
        expect(result.rows[0].message).toEqual("string");
    });
});

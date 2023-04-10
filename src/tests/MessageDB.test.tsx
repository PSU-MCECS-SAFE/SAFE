import { Pool } from 'pg';

describe('PostgreSQL database connection', () => {
    let pool: Pool;

    beforeAll(() => {
        pool = new Pool({
            user: 'haosheng',
            password: 'pw3m3pb#Dp',
            host: 'db.cecs.pdx.edu',
            database: 'haosheng',
            port: 5432,
            ssl: { rejectUnauthorized: false },
        });
    });

    afterAll(async () => {
        await pool.end();
    });

    // DB connection test
    it('should connect to the database', async () => {
        const client = await pool.connect();
        const result = await client.query('SELECT $1::text as message', ['Hello world!']);
        client.release();
        expect(result.rows[0].message).toBe('Hello world!');
    });

    // POST request to DB test
    it('should insert a new record into the database', async () => {
        const data = {
            title: 'New message',
            receiver_name: 'Leshi Chen',
            message: 'This is a new message',
        };
        const result = await pool.query(
            'INSERT INTO "Message" (title, receiver_name, message) VALUES ($1, $2, $3) RETURNING *',
            [data.title, data.receiver_name, data.message]
        );
        expect(result.rows[0]).toMatchObject({
            title: data.title,
            receiver_name: data.receiver_name,
            message: data.message,
            code: null,
            receive_reply: null,
            has_been_read: null,
            time_submitted: null,
        });
    });

    // GET request to DB test
    it('should return the expected result', async () => {
        const result = await pool.query('SELECT * FROM "Message" WHERE title = $1', ['New message']);
        expect(result.rows[0]).toMatchObject({
            title: 'New message',
            receiver_name: 'Leshi Chen',
            message: 'This is a new message',
            code: null,
            receive_reply: null,
            has_been_read: null,
            time_submitted: null,
        });
    });

});

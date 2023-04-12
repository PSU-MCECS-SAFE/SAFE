import { messageDB } from '../safeMessageDB/messageDB';
import { messageDBConnect } from '../safeMessageDB/messageDBConnect';

describe('PostgreSQL database connection', () => {
    afterAll(async () => {
        await messageDBConnect.end();
    });

    // Message DB connection testing 
    it('should be able to connect to the database', async () => {
        try {
            const client = await messageDBConnect.connect();
            expect(true).toBeTruthy();
        } catch (err) {
            fail(err);
        }
    });

});

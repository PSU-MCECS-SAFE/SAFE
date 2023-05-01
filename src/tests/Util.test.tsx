import fs from 'fs';
import * as util from "../safeUtil/Util";
import { safeJSONProps as sjp } from "../safeUtil/Util";

const TESTPATH = './testing.json';
describe('Util Tests', () => {

    //JSON file property acquisition testing
    describe('Identify each JSON property from test file.', () => {
        beforeAll(() => {
            const testJSON = {
                username: 'Test Name',
                password: 'testpassword',
                db_address: 'test.address',
                db_name: 'test db name',
                rcvr_email: 'test@testing.com'
            };
            const jsonTest = JSON.stringify(testJSON);
            fs.writeFileSync(TESTPATH, jsonTest);
        });

        afterAll(() => {
            fs.unlink('./testing.json', (err) => {
                if (err) throw err;
            });
        });
        it('Acquire username from testing.json', () => {
            expect(util.getConfigProp(sjp.username, TESTPATH)).toBe("Test Name")
        });
    });
});

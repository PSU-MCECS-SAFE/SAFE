import { messageDB } from '../safeMessageDB/messageDB';
import { messageDBConnect } from '../safeMessageDB/messageDBConnect';

// import { messageDB } from './messageDB';
// import { messageDBConnect } from './messageDBConnect';
import sinon from 'sinon';

describe('messageDB', () => {
  let connectSpy: sinon.SinonSpy;
  let querySpy: sinon.SinonSpy;
  let endSpy: sinon.SinonSpy;

  beforeEach(() => {
    connectSpy = sinon.spy(messageDBConnect, 'connect');
    querySpy = sinon.spy(messageDBConnect, 'query');
    endSpy = sinon.spy(messageDBConnect, 'end');
  });

  afterEach(() => {
    connectSpy.restore();
    querySpy.restore();
    endSpy.restore();
  });

  describe('addMessage', () => {
    it('should call connect, query, and end with the correct arguments', async () => {
      const title = 'Test Title';
      const receiver_name = 'Test Receiver';
      const message = 'Test Message';
      const insert = new messageDB();

      await insert.addMessage(title, receiver_name, message);

      expect(connectSpy.calledOnce).toBe(true);
      expect(querySpy.calledOnceWith(`INSERT INTO "Message" (title, receiver_name, message, code, receive_reply, has_been_read, time_submitted) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [title, receiver_name, message, null, null, null, null])).toBe(true);
      expect(endSpy.calledOnce).toBe(true);
    });
  });
});


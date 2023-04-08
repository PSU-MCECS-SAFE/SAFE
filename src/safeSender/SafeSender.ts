export class Sender {
  message: Message;
  database: MessageDB;

  public constructor() {
    this.message = new Message();
    this.database = new MessageDB();
  }

  public createMessage() {
    this.message.createMessage();
  }

  public savetoDB() {
    this.database.addMessage(this.message);
  }

  public emailMessage() {
    
  }
}

export default Sender;
  
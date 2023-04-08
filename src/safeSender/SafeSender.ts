export class Sender {
  message: Message;
  database: MessageDB;

  public constructor(message: Message, database: MessageDB;) {
    if (message === undefined) {
      throw new Error("No Message.");
    }
    if (database === undefined) {
      throw new Error("No Database.");
    }
    this.message = message;
    this.database = database;
  }

  public savetoDB() {

  }

  public emailMessage() {
    
  }
}

export default Sender;
  
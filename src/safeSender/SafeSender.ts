export class Sender {
  newMessage: Message;
  database: MessageDB;

  public constructor(title: string, receiver_name: string, message: string) {
    this.newMessage = new Message(title, receiver_name, message);
    this.database = new MessageDB();
  }

  public savetoDB() {
    this.database.addMessage(this.message);
  }

  public emailMessage() {
    
  }
}

export default Sender;
  
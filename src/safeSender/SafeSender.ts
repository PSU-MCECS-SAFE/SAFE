export class Sender {
  //sender class has two objects. the message the sender wants to send and an the database where it is stored
  newMessage: Message;
  database: MessageDB;

  public constructor() {
    this.newMessage = null;
    this.database = new MessageDB();
  }

  //create a new message using the necessary strings
  public createMessage(title: string, receiver_name: string, message: string) {
    if (this.newMessage === undefined || this.newMessage === null) {
      this.newMessage = new Message(title, receiver_name, message);
    } else {
      throw new Error("A Message already exists.");
    } 
  }

  //save message to the database
  public savetoDB() {
    if (this.newMessage === undefined || this.newMessage === null) {
      throw new Error("No message to save to the database.");
    } else {
      this.database.addMessage(this.newMessage);
    }
  }

  //email the message to the receiver
  public emailMessage() {
    if (this.newMessage === undefined || this.newMessage === null) {
      throw new Error("No message to email.");
    } else {

    }
  }

  //Let the sender View the code connected to the sender's message
  public viewCode() {
    if (this.newMessage === undefined || this.newMessage === null) {
      throw new Error("There is no message or code related to a message.");
    } else {

    }
  }
}

export default Sender;
  
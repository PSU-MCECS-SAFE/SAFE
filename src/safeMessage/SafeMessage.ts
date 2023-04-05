export class Message {
  title: string;
  receiver_name: string;
  message: string;

  public constructor(title: string, receiver_name: string, message: string) {
    this.title = title;
    this.receiver_name = receiver_name;
    this.message = message;
  }
}

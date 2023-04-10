/**
 * Message class utilized throughout SAFE to capture, transfer, and display
 * data to users.
 */
export class Message {
  title: string;
  receiver_name: string;
  message: string;
  code: string;
  receive_reply: boolean;
  has_been_read : boolean;
  time_submitted : Date;

  /**
   * Constructor for the `Message` class object
   * @param title - The messages title being sent to the receiver
   * @param receiver_name - Who the intended recipient is
   * @param message - The message the sender is sending
   */
  public constructor (title: string,
                      receiver_name: string,
                      message: string,
                      code: string = "",
                      receive_reply: boolean = false,
                      has_been_read: boolean = false,
                      time_submitted: Date = new Date()
                      ) {
    this.verify_string(title, "title");
    this.verify_string(receiver_name, "intended Receiver");
    this.verify_string(message, "message");
    
    this.title = title;
    this.receiver_name = receiver_name;
    this.message = message;
    this.code = code;
    this.receive_reply = receive_reply;
    this.has_been_read = has_been_read;
    this.time_submitted = time_submitted;
  }

  private verify_string(variable_name: string, field_name: string) {
    if (variable_name === undefined || variable_name.length === 0) {
      throw new Error("The " + field_name + " cannot be empty.");
    }
  }
}


// Allows quick imports from this class into other files.
export default Message;
/**
 * Message class utilized throughout SAFE to capture, transfer, and display
 * data to users.
 */
export class Message {
  title: string;
  receiver_name: string;
  message: string;

  /**
   * Constructor for the `Message` class object
   * @param title - The messages title being sent to the receiver
   * @param receiver_name - Who the intended recipient is
   * @param message - The message the sender is sending
   */
  public constructor(title: string, receiver_name: string, message: string) {
    if (title === undefined || title.length === 0) {
      throw new Error("The title cannot be empty.");
    }
    if (receiver_name === undefined || receiver_name.length === 0) {
      throw new Error("The intended Receiver cannot be empty.");
    }
    if (message === undefined || message.length === 0) {
      throw new Error("The message cannot be empty.");
    }
    this.title = title;
    this.receiver_name = receiver_name;
    this.message = message;
  }
}

// Allows quick imports from this class into other files.
export default Message;

const TITLE_FIELD: string = "title";
const RECEIVER_FIELD: string = "intended Receiver";
const MESSAGE_FIELD: string = "message";
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
  has_been_read: boolean;
  time_submitted: Date;

  /**
   * Constructor for the `Message` class object
   * @param title - The messages title being sent to the receiver
   * @param receiver_name - Who the intended recipient is
   * @param message - The message the sender is sending
   */
  /* Add these to the docstring above when they come online.
   * param code - WIP. This feature has yet to be created. 
   *              Code generated for sender to view feedback if any provided
   * param receive_reply - WIP. This feature has yet to be created.
   *                        Indicator that this feedback message is requesting
   *                        a reply.
   * param has_been_read - WIP. This feature has yet to be created.
   *                        Indicator that this feedback message has been read.
   * param time_submitted - WIP. This feature has yet to be created.
   *                         Date/Time message was submitted.
   */
  public constructor(
    title: string,
    receiver_name: string,
    message: string,
    code: string = "",
    receive_reply: boolean = false,
    has_been_read: boolean = false,
    time_submitted: Date = new Date()
  ) {
    this.verify_string(title, TITLE_FIELD);
    this.verify_string(receiver_name, RECEIVER_FIELD);
    this.verify_string(message, MESSAGE_FIELD);

    this.title = title;
    this.receiver_name = receiver_name;
    this.message = message;
    this.code = code;
    this.receive_reply = receive_reply;
    this.has_been_read = has_been_read;
    this.time_submitted = time_submitted;
  }

  /**
   * Verifies that the information being provided in the constructor is not
   * undefined or an empty string.
   * @param variable_name - Argument being error checked
   * @param field_name - Field being checked for Message class variable
   */
  private verify_string(variable_name: string, field_name: string) {
    if (variable_name === undefined || variable_name.length === 0) {
      throw new Error("The " + field_name + " cannot be empty.");
    }
  }
}


// Allows quick imports from this class into other files.
export default Message;
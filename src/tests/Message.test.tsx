import Message from "../safeMessage/SafeMessage";

/* Some tests will create objects that aren't ever accessed and that's fine,
 * as we're testing for assertions or something else. This next comment disables
 * any alerts from eslint regarding unused vars for this file. 
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

//Demo object to use in validation
const testObject: Message = new Message(
    "Test Title",
    "Test Receiver",
    "Test String"
);


//Validate the constructor generates an object correctly
test("Validation of message constructor", () => {
    expect(testObject.title).toBe("Test Title");
    expect(testObject.receiver_name).toBe("Test Receiver");
    expect(testObject.message).toBe("Test String");
});


// Checking if error is thrown if title is empty in several flavors.
test("Constructor throws if `title` is empty", () => {
    expect(() => {
        const assertTitleNull: Message = new Message("", "", "");
    }).toThrowError("The title cannot be empty.");

    expect(() => {
        const assertTitleNull: Message = new Message("", "Test Rcvr", "");
    }).toThrowError("The title cannot be empty.");

    expect(() => {
        const assertTitleNull: Message = new Message("", "Test Rcvr", "Test Str");
    }).toThrowError("The title cannot be empty.");

    expect(() => {
        const assertTitleNull: Message = new Message("", "", "Test Str");
    }).toThrowError("The title cannot be empty.");
});


// Checking if error is thrown if receiver_name is empty in several flavors.
test("Constructor throws if `receiver_name` is empty", () => {
    expect(() => {
        const assertTitleNull: Message = new Message("Test Title", "", "");
    }).toThrowError("The intended Receiver cannot be empty.");

    expect(() => {
        const assertTitleNull: Message = new Message("Test Title", "", "Test Str");
    }).toThrowError("The intended Receiver cannot be empty.");
});


// Checking if error is thrown if message is empty. Only one possible test here!
test("Constructor throws if `message` is empty", () => {
    expect(() => {
        const assertTitleNull: Message = new Message("Test Title", "Test Rcvr", "");
    }).toThrowError("The message cannot be empty.");
});

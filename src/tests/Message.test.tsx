import Message from "../safeMessage/SafeMessage";


//Validate the constructor generates an object correctly
test("Validation of message constructor", () => {
    expect(() => {
        new Message(
            "Test Title",
            "Test Receiver",
            "Test String"
        );
    }).not.toThrowError();
});


// Checking if error is thrown if title is empty in several flavors.
test("Constructor throws if `title` is empty", () => {
    expect(() => {
        new Message("", "", "");
    }).toThrowError("The title cannot be empty.");

    expect(() => {
        new Message("", "Test Rcvr", "");
    }).toThrowError("The title cannot be empty.");

    expect(() => {
        new Message("", "Test Rcvr", "Test Str");
    }).toThrowError("The title cannot be empty.");

    expect(() => {
        new Message("", "", "Test Str");
    }).toThrowError("The title cannot be empty.");
});


// Checking if error is thrown if receiver_name is empty in several flavors.
test("Constructor throws if `receiver_name` is empty", () => {
    expect(() => {
        new Message("Test Title", "", "");
    }).toThrowError("The intended Receiver cannot be empty.");

    expect(() => {
        new Message("Test Title", "", "Test Str");
    }).toThrowError("The intended Receiver cannot be empty.");
});


// Checking if error is thrown if message is empty. Only one possible test here!
test("Constructor throws if `message` is empty", () => {
    expect(() => {
        new Message("Test Title", "Test Rcvr", "");
    }).toThrowError("The message cannot be empty.");
});

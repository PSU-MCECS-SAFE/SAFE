import Message from "../safeMessage/SafeMessage";

// Validate the constructor generates an object correctly given minimal values
test("Validation of message constructor with minimum given initial values", () => {
    expect(() => {
        new Message(
            "Test Title",
            "Test Receiver",
            "Test String"
        );
    }).not.toThrowError();

    // Now knowing the constructor work, lets check that the variables 
    // are filled up correctly
    const testObject: Message = new Message(
        "Test Title",
        "Test Receiver",
        "Test String"
    );
    expect(testObject.title).toBe("Test Title");
    expect(testObject.receiver_name).toBe("Test Receiver");
    expect(testObject.message).toBe("Test String");
    expect(testObject.code).toBe("");
    expect(testObject.receive_reply).toBe(false);
    expect(testObject.has_been_read).toBe(false);
    expect(testObject.time_submitted).toBeInstanceOf(Date);
});

// Validate the constructor generates an object correctly given maximum values
test("Validation of message constructor with maximum given initial values", () => {
    var currDate: Date = new Date();
    expect(() => {
        new Message(
            "Test Title",
            "Test Receiver",
            "Test String",
            "abc123",
            true,
            true,
            currDate
        );
    }).not.toThrowError();

    // Now knowing the constructor work, lets check that the variables 
    // are filled up correctly
    const testObject: Message = new Message(
        "Test Title",
        "Test Receiver",
        "Test String",
        "abc123",
        true,
        true,
        currDate
    );
    expect(testObject.title).toBe("Test Title");
    expect(testObject.receiver_name).toBe("Test Receiver");
    expect(testObject.message).toBe("Test String");
    expect(testObject.code).toBe("abc123");
    expect(testObject.receive_reply).toBe(true);
    expect(testObject.has_been_read).toBe(true);
    expect(testObject.time_submitted).toBe(currDate);
});

// Checking if error is thrown if title is empty in several flavors.
test("Constructor throws if `title` is empty", () => {
    expect(() => {
        new Message("", "Test Rcvr", "Test Str");
    }).toThrowError("The title cannot be empty.");
});

// Checking if error is thrown if receiver_name is empty in several flavors.
test("Constructor throws if `receiver_name` is empty", () => {
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

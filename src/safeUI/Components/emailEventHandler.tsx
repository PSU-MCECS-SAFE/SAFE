/* Event functions for the email modal and code modal
 * referenced in submitForm.tsx
 */

export const handleEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    MAX_EMAIL_CHARACTERS,
    setEmail,
    setValidEmail,
    emailRegex
) => {
    const newEmail = e.target.value;
    const newCharacterCount = newEmail.length;
    if (newCharacterCount <= MAX_EMAIL_CHARACTERS) {
        setEmail(newEmail);
        setValidEmail(emailRegex.test(newEmail));
    }
};

export const handleClose = (
    setOpenEmail,
    setOpenCode
) => {
    setOpenEmail(false);
    setOpenCode(false);
    // refresh the page once user hit close button
    window.location.reload();
};

export const handleYes = (
    port,
    code,
    setOpenEmail,
    setOpenCode
) => {
    fetch(`http://131.252.208.28:${port}/setReply`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        code: code,
        }),
    })
        // response from fetch
        .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.text();
        });
    setOpenEmail(false);
    setOpenCode(true);
};

export const handleEmail = (
    e: React.FormEvent<HTMLFormElement>,
    setEmailError,
    setEmailHelperText,
    email,
    validEmail,
    code,
    handleOpenError,
    setOpenCode,
    port
) => {
    e.preventDefault();
    setEmailError(false);
    setEmailHelperText('');
    if (email === '') {
        setEmailError(true);
        setEmailHelperText('This field is required');
    } else if (validEmail === false) {
        setEmailError(true);
        setEmailHelperText('Enter a valid email');
    } else {
        fetch(`http://131.252.208.28:${port}/receiverEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            code: code,
        }),
        })
        // response from fetch
        .then((response) => {
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            window.location.reload();
            return response.text();
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            handleOpenError();
        });
        setOpenCode(false);
    }
};
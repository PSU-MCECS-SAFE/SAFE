/* Event functions for the different components to be
 * referenced in checkReply.tsx
 */

export const handleOpenInputCodeModal = (setOpenInputCodeModal) => {
  setOpenInputCodeModal(true);
};

export const handleCloseInputCodeModal = (
  setOpenInputCodeModal,
  setCodeModalHelperText
) => {
  setOpenInputCodeModal(false);
  setCodeModalHelperText("");
};

export const handleOpenMessageModal = (
  setOpenMessageModal,
  setOpenInputCodeModal
) => {
  setOpenMessageModal(true);
  setOpenInputCodeModal(false);
};

export const handleCloseMessageModal = (setOpenMessageModal) => {
  setOpenMessageModal(false);
};

// CHECK REPLY button main function
export const handleCodeSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  port,
  inputCode,
  setcheck_message,
  handleOpenMessageModal,
  setOpenMessageModal,
  setOpenInputCodeModal,
  setValidCode,
  setCodeModalHelperText
) => {
  e.preventDefault();
  // fetching getmessage endpoint and pass in inputCode in url
  fetch(
    `http://131.252.208.28:${port}/getmessage?code=${encodeURIComponent(
      inputCode
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    // response from fetch
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      setcheck_message(responseJson);
      handleOpenMessageModal(setOpenMessageModal, setOpenInputCodeModal);
      setValidCode(true);
      setCodeModalHelperText("");
    })
    // If catching error from endpoint, display error message
    .catch((error) => {
      console.log(error);
      setOpenMessageModal(false);
      setValidCode(false);
      setCodeModalHelperText("Code is invalid. Please try another code.");
    });
};

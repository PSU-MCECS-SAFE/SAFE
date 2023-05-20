/* Event functions for the different components to be
 * referenced in submitForm.tsx
 */

export const handleMessageChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setMessage,
  setCharCount
) => {
  const newMessage = e.target.value;
  const newCharacterCount = newMessage.length;
  if (newCharacterCount <= 7500) {
    setMessage(newMessage);
    setCharCount(newCharacterCount);
  }
};

export const handleSubjectChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setSubject,
  setSubjectCharCount
) => {
  const newSubject = e.target.value;
  const newCharacterCount = newSubject.length;
  if (newCharacterCount <= 100) {
    setSubject(newSubject);
    setSubjectCharCount(newCharacterCount);
  }
};

export const handleCloseSuccessSent = (setOpenSuccess, setShouldReload) => {
  setOpenSuccess(false);
  setShouldReload(true);
};

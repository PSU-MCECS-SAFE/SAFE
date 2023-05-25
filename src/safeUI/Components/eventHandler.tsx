/* Event functions for the different components to be
 * referenced in submitForm.tsx
 */

const MAX_CHARACTERS = 7500;
const MAX_Subject_CHARACTERS = 100;

export const handleMessageChange = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setMessage,
  setCharCount
) => {
  const newMessage = e.target.value;
  const newCharacterCount = newMessage.length;
  if (newCharacterCount <= MAX_CHARACTERS) {
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
  if (newCharacterCount <= MAX_Subject_CHARACTERS) {
    setSubject(newSubject);
    setSubjectCharCount(newCharacterCount);
  }
};

export const handleCloseSuccessSent = (setOpenSuccess, setShouldReload) => {
  setOpenSuccess(false);
  setShouldReload(true);
};

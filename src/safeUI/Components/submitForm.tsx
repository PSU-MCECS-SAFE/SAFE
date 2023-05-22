import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SubjectField from './Form Components/subjectField';
import SubmitError from './Form Components/submitError';
import SubmitSuccess from './Form Components/submitSuccess';
import TitleNine from './Form Components/titleNine';
import ToField from './Form Components/toField';
import MessageField from './Form Components/messageField';
import SubmitButton from './Form Components/submitButton';
import {
  handleMessageChange,
  handleSubjectChange,
  handleCloseSuccessSent,
} from './eventHandler';

/* Main form components packaged here and sent to SafeUI.
 * Contains some event functions and calls to the other form components.
 *
 * SubmitForm wraps 7 smaller components -
 * ToField, SubjectField, MessageField,
 * SubmitError, SubmitSuccess, TitleNine
 * and SubmitButton
 *
 * Consider combining Submit success/error into single function
 * and breaking up handleSubmit to reduce file length and
 * improve readability.
 */

const MAX_CHARACTERS = 7500;
const MAX_Subject_CHARACTERS = 100;

function SubmitForm() {
  const [characterCount, setCharCount] = useState(0);
  const [subjectCharacterCount, setSubjectCharCount] = useState(0);
  const [to, setTo] = useState('PSU CS Department');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToError(false);
    setSubjectError(false);
    setMessageError(false);

    if (to && subject && message) {
      // send POST request to 'addMessage' route
      const port = 3001;
      fetch(`http://131.252.208.28:${port}/addMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //JSON payload in the request body that contains data
        body: JSON.stringify({
          title: subject,
          receiver_name: to,
          message: message,
          code: null,
          receive_reply: false,
          has_been_read: false,
          time_submitted: null,
          message_reply: null,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          } else {
            setOpenSuccess(true);
          }
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          handleOpenError();
        });
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formEvent = new Event('submit', {
      bubbles: true,
    }) as unknown as React.FormEvent<HTMLFormElement>;
    handleSubmit(formEvent);
  };

  const isSubmitDisabled = !to || !subject || !message;

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <Grid container rowSpacing={2} spacing={2} justifyContent='center'>
        <ToField onChange={(e) => setTo(e.target.value)} error={toError} />

        <SubjectField
          onChange={(event) =>
            handleSubjectChange(event, setSubject, setSubjectCharCount)
          }
          error={subjectError}
          maxCharCount={MAX_Subject_CHARACTERS}
          subCharCount={subjectCharacterCount}
        />

        <MessageField
          onChange={(event) =>
            handleMessageChange(event, setMessage, setCharCount)
          }
          error={messageError}
          maxCharCount={MAX_CHARACTERS}
          charCount={characterCount}
        />
        <TitleNine />
        <SubmitButton disabled={isSubmitDisabled} onClick={handleButtonClick} />
        <SubmitError open={openError} onClose={handleCloseError} />
        <SubmitSuccess
          open={openSuccess}
          onClose={() => handleCloseSuccessSent(setSubject, setShouldReload)}
        />
      </Grid>
    </form>
  );
}

export default SubmitForm;

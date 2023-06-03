import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SubjectField from './Form Components/subjectField';
import SubmitError from './Form Components/submitError';
import TitleNine from './Form Components/titleNine';
import ToField from './Form Components/toField';
import MessageField from './Form Components/messageField';
import SubmitButton from './Form Components/submitButton';
import EmailModal from './Form Components/emailModal';
import CodeModal from './Form Components/codeModal';
import {
  handleMessageChange,
  handleSubjectChange,
  handleButtonClick,
} from './eventHandler';

import {
  handleEmailChange,
  handleClose,
  handleYes,
  handleEmail,
} from './emailEventHandler';

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
const MAX_EMAIL_CHARACTERS = 256;
const port = 3001;

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
  const [shouldReload, setShouldReload] = useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);
  const [code, setCode] = useState('');
  const [openEmail, setOpenEmail] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  );

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
        // response from fetch
        .then((response) => {
          if (response.status === 205) {
            alert('Invalid message: message contains profanities');
            return;
          } else if (!response.ok) {
            throw new Error(response.statusText);
          }
          setOpenEmail(true);
          return response.text();
        })
        .then((responseText) => {
          if (responseText)
            setCode(responseText);
        })
        .catch((error) => {
          setOpenEmail(false);
          console.error('There was a problem with the fetch operation:', error);
          handleOpenError();
        });
    }
  };

  const isSubmitDisabled = !to || !subject || !message;

  return (
    <form noValidate autoComplete='off'>
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
        <SubmitButton
          disabled={isSubmitDisabled}
          onClick={(event) => handleButtonClick(event, handleSubmit)}
        />
        <SubmitError open={openError} onClose={handleCloseError} />

        <EmailModal
          openEmail={openEmail}
          handleClose={() => handleClose(setOpenEmail, setOpenCode)}
          handleYes={() => handleYes(port, code, setOpenEmail, setOpenCode)}
        />

        <CodeModal
          openCode={openCode}
          handleClose={() => handleClose(setOpenEmail, setOpenCode)}
          handleEmail={(event) =>
            handleEmail(
              event,
              setEmailError,
              setEmailHelperText,
              email,
              validEmail,
              code,
              handleOpenError,
              setOpenCode,
              port
            )
          }
          code={code}
          handleEmailChange={(event) =>
            handleEmailChange(
              event,
              MAX_EMAIL_CHARACTERS,
              setEmail,
              setValidEmail,
              emailRegex
            )
          }
          emailError={emailError}
          emailHelperText={emailHelperText}
          MAX_EMAIL_CHARACTERS={MAX_EMAIL_CHARACTERS}
        />
      </Grid>
    </form>
  );
}

export default SubmitForm;
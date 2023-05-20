import { Grid } from '@mui/material';
import React, { useState } from 'react';
import SubjectField from './Form Components/subjectField';
import SubmitError from './submitError';
import SubmitSuccess from './submitSuccess';
import TitleNine from './titleNine';
import ToField from './Form Components/toField';
import MessageField from './Form Components/messageField';
import SubmitButton from './Form Components/submitButton';

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
  //   const [helperText, setHelperText] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const handleCloseSuccessSent = () => {
    setOpenSuccess(false);
    window.location.reload(); // Refresh the page
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    const newCharacterCount = newMessage.length;
    if (newCharacterCount <= 7500) {
      setMessage(newMessage);
      setCharCount(newCharacterCount);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSubject = e.target.value;
    const newCharacterCount = newSubject.length;
    if (newCharacterCount <= 100) {
      setSubject(newSubject);
      setSubjectCharCount(newCharacterCount);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToError(false);
    setSubjectError(false);
    setMessageError(false);

    if (to && subject && message) {
      /**
       * This is how to call the getMessage from atabase
       */

      // fetch('http://localhost:3001/message')
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => console.error(error))

      // fetch data from API endpoint
      // param: request method, header, body
      const port = 3001;
      fetch(`http://131.252.208.28:${port}/addMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //make the body from JavaScript object to be JSON object
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
        //response from fetch
        //response has different types of data that got carry
        //out from the Post request
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          } else {
            setOpenSuccess(true);
          }
        })
        //catch any error, this can be spicify later to catch some paticular error
        //and respond the correct message instead of a genearal message like this
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
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container rowSpacing={2} spacing={2} justifyContent="center">
        {/* ToField Component */}
        <ToField onChange={(e) => setTo(e.target.value)} error={toError} />

        {/* SubjectField Component  */}
        <SubjectField
          onChange={handleSubjectChange}
          error={subjectError}
          maxCharCount={MAX_Subject_CHARACTERS}
          subCharCount={subjectCharacterCount}
        />

        <MessageField
          onChange={handleMessageChange}
          error={messageError}
          maxCharCount={MAX_CHARACTERS }
          charCount={characterCount}
        />

        <Grid item xs={8}>
          <TitleNine />
        </Grid>

        <SubmitButton 
          disabled={isSubmitDisabled}
          onClick={handleButtonClick}
        />   
        
        <SubmitError open={openError} onClose={handleCloseError} />
        <SubmitSuccess open={openSuccess} onClose={handleCloseSuccessSent} /> 
      </Grid>
    </form>
  );
}

export default SubmitForm;

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

// --- Additional Feature - Jaafar ---
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { StyledButton, StyledSubmitButton } from '../Styles/Styled';
import { TextField } from '@mui/material';
const MAX_EMAIL_CHARACTERS = 256;
// --- end ---

const MAX_CHARACTERS = 7500;
const MAX_Subject_CHARACTERS = 100;
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
  const [openSuccess, setOpenSuccess] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  // --- Additional Feature - Jaafar ---
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
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

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEmail = e.target.value;
    const newCharacterCount = newEmail.length;
    if (newCharacterCount <= MAX_EMAIL_CHARACTERS) {
      setEmail(newEmail);
      setValidEmail(emailRegex.test(newEmail));
    }
  };

  const handleClose = () => {
    setOpenEmail(false);
    setOpenCode(false);
    // refresh the page once user hit close button
    window.location.reload();
  };

  const handleYes = () => {
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

  const handleEmail = (e: React.FormEvent<HTMLFormElement>) => {
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
  // --- end ---

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
        // --- Additional feature - Jaafar ---
        // response from fetch
        .then((response) => {
          if (response.status === 400) {
            throw new Error('Invalid message: message contains profanities');
          } else if (!response.ok) {
            throw new Error(response.statusText);
          }
          setOpenEmail(true);
          handleSnackbarOpen();
          return response.text();
        })
        .then((responseText) => {
          setCode(responseText);
        })
        // --- End ---
        .catch((error) => {
          setOpenEmail(false);
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

      {/* --- Additonal Feature - Jaafar --- */}
      <Dialog
        open={openEmail}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          Your feedback successfully sent to PSU CS Department! Would you like
          to receive repliy to your feedback?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If yes, you will get a code that you can use to check back here for
            reply
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton autoFocus onClick={handleClose}>
            No
          </StyledButton>
          <StyledButton onClick={handleYes} autoFocus>
            Yes
          </StyledButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCode}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Would you like to receive your code by Email?'}
        </DialogTitle>
        <form noValidate autoComplete='off' onSubmit={handleEmail}>
          <DialogContent>
            <DialogContentText>Code: {code}</DialogContentText>
            <DialogContentText>
              Here is your code. If you wish for us to email you the code please
              enter your email. Your email will not be saved!
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
              placeholder='Enter Email'
              autoComplete='off'
              spellCheck='false'
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailHelperText}
              inputProps={{ maxlength: MAX_EMAIL_CHARACTERS }}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleClose}>No</StyledButton>
            <StyledSubmitButton variant='contained' type='submit'>
              Submit
            </StyledSubmitButton>
          </DialogActions>
        </form>
      </Dialog>
      {/* --- End --- */}
    </form>
  );
}

export default SubmitForm;

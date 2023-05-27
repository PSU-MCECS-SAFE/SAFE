//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { StyledSubmitButton } from './Styles/Styled';
import { StyledButton } from './Styles/Styled';
import React from 'react';
// import { lightGreen } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';
import { ip, port, addr } from '../safeMessageDB/messageDBConnect';

import BannerBar from './Components/bannerBar';
import HeaderText from './Components/headerText';
import SubmitForm from './Components/submitForm';

const MAX_CHARACTERS: number = 1000
const MAX_EMAIL_CHARACTERS: number = 1000
const MAX_Subject_CHARACTERS: number = 1000

/* SAFE UI application is rendered here. Individual components
 * are broken up and referenced from the Component folder to
 * improve system readability and maintainability.
 */

function SafeUI() {
  const [code, setCode] = useState('');
  const [check_message, setcheck_message] = useState<any>(null);

  const [characterCount, setCharCount] = useState(0);
  const [subjectCharacterCount, setSubjectCharCount] = useState(0);
  const [to, setTo] = useState('PSU CS Department');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [helperText, setHelperText] = useState('');
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
  const [openInputCodeModal, setOpenInputCodeModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [validCode, setValidCode] = useState(false);
  const [codeModalHelperText, setCodeModalHelperText] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    const newCharacterCount = newMessage.length;
    if (newCharacterCount <= MAX_CHARACTERS) {
      setMessage(newMessage);
      setCharCount(newCharacterCount);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSubject = e.target.value;
    const newCharacterCount = newSubject.length;
    if (newCharacterCount <= MAX_Subject_CHARACTERS) {
      setSubject(newSubject);
      setSubjectCharCount(newCharacterCount);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEmail = e.target.value;
    const newCharacterCount = newEmail.length;
    if (newCharacterCount <= MAX_EMAIL_CHARACTERS) {
      setEmail(newEmail);
      setValidEmail(emailRegex.test(newEmail));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToError(false);
    setSubjectError(false);
    setMessageError(false);
    setHelperText('');

    if (to === '') {
      setToError(true);
      setHelperText('This field is required');
    }
    if (subject === '') {
      setSubjectError(true);
      setHelperText('This field is required');
    }
    if (message === '') {
      setMessageError(true);
      setHelperText('This field is required');
    }

    if (to && subject && message) {
      /**
       * This is how to call the getMessage from atabase
       */

      // fetch('https://localhost:3001/message')
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => console.error(error))

      // fetch data from API endpoint
      // param: request method, header, body
      fetch(`${addr}/addMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: subject,
          receiver_name: to,
          message: message,
          receive_reply: false,
          has_been_read: false,
          message_reply: null,
        }),
      })
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
        .catch((error) => {
          setOpenEmail(false);
          console.error('There was a problem with the fetch operation:', error);
          alert(error);
        });
    }
  };

  const handleClose = () => {
    setOpenEmail(false);
    setOpenCode(false);
    // refresh the page once user hit close button
    window.location.reload();
  };

  const handleYes = () => {
    fetch(`${addr}/setReply`, {
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
      })
      .then((responseText) => {
        alert(responseText);
        window.location.reload();
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
      fetch(`${addr}/receiverEmail`, {
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
          return response.text();
        })
        .then((responseText) => {
          alert(responseText);
          window.location.reload();
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
          alert(error);
        });
      setOpenCode(false);
    }
  };

  const handleOpenInputCodeModal = () => {
    setOpenInputCodeModal(true);
  };

  const handleCloseInputCodeModal = () => {
    setOpenInputCodeModal(false);
    setCodeModalHelperText('');
  };

  const handleOpenMessageModal = () => {
    setOpenMessageModal(true);
    setOpenInputCodeModal(false);
  };

  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
  };

  // CHECK REPLY button main function
  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetching getmessage endpoint and pass in inputCode in url
    fetch(
      `${addr}/getmessage?code=${encodeURIComponent(
        inputCode
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
        handleOpenMessageModal();
        setValidCode(true);
        setCodeModalHelperText('');
      })
      // If catching error from endpoint, display error message
      .catch((error) => {
        console.log(error);
        setOpenMessageModal(false);
        setValidCode(false);
        setCodeModalHelperText('Code is invalid. Please try another code.');
      });
  };

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formEvent = new Event('submit', {
      bubbles: true,
    }) as unknown as React.FormEvent<HTMLFormElement>;
    handleSubmit(formEvent);
  };

  const uniqueCodeInputModal = (
    <div>
      <DialogTitle> Input Unique Code</DialogTitle>
      <form noValidate autoComplete='off' onSubmit={handleCodeSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter provided unique code to view response
          </DialogContentText>
          <Box textAlign='center' sx={{ padding: '1rem' }}>
            <TextField
              variant='outlined'
              label='Provided Code'
              placeholder='Provided Code'
              helperText={codeModalHelperText}
              sx={{ input: { textAlign: 'center' } }}
              onChange={(e) => setInputCode(e.target.value)}
            ></TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseInputCodeModal}>Close</StyledButton>
          <StyledSubmitButton variant='contained' type='submit'>
            Submit
          </StyledSubmitButton>
        </DialogActions>
      </form>
    </div>
  );

  const displayMessageModal = (
    <div>
      <DialogTitle sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        {' '}
        Message{' '}
      </DialogTitle>
      <DialogContent>
        {check_message && (
          <DialogContentText
            sx={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
              marginBottom: '16px',
            }}
          >
            <div>
              <strong>Sent Message: </strong> <br />
              {check_message.message}
            </div>
            <div style={{ marginTop: '10px' }}>
              <strong>Reply: </strong> <br />
              {check_message.message_reply}
            </div>
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleCloseMessageModal}> Close</StyledButton>
      </DialogActions>
    </div>
  );

  const isSubmitDisabled = !to || !subject || !message;

  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <BannerBar />
      <HeaderText />
      <SubmitForm />
    </Box>
  );
}

export default SafeUI;

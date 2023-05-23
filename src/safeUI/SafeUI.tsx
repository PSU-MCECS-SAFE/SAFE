//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!'
import React from 'react';
import { Box } from '@mui/material';
import BannerBar from './Components/bannerBar';
import HeaderText from './Components/headerText';
import SubmitForm from './Components/submitForm';

/* SAFE UI application is rendered here. Individual components
 * are broken up and referenced from the Component folder to
 * improve system readability and maintainability.
 */

import {
  Box,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { StyledSubmitButton } from './Styles/Styled';
import { StyledButton } from './Styles/Styled';
import { useCallback, useEffect, useState } from 'react';
import { checkString, checkProfanities } from '../safeMessageDB/verifyString';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const MAX_EMAIL_CHARACTERS = 256;

function SafeUI() {
  const [code, setCode] = useState('');
  const [check_message, setcheck_message] = useState<any>(null);

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
    fetch('http://131.252.208.28:3004/setReply', {
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
      fetch('http://131.252.208.28:3004/receiverEmail', {
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
      `http://131.252.208.28:3004/getmessage?code=${encodeURIComponent(
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

  const 
  = () => {
    setOpen(true);
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

function SafeUI() {
  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <BannerBar />
      <HeaderText />
      <SubmitForm />

      // below are additional features code
        <Box textAlign='right' sx={{ height: '38px' }}>
          <StyledButton
            variant='contained'
            onClick={handleOpenInputCodeModal}
            autoFocus
            sx={{
              height: '38px',
              backgroundColor: '#6a7f10',
              color: 'rgb(255,255,255)',
              fontSize: '14px',
              paddingLeft: '16px',
              paddingRight: '16px',
              textAlign: 'center',
              '&:hover': {
                backgroundColor: '#1d252d',
                color: '#FFFFFF',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            Check Reply
          </StyledButton>
          <Dialog open={openInputCodeModal} onClose={handleCloseInputCodeModal}>
            {uniqueCodeInputModal}
          </Dialog>
          <Dialog
            open={openMessageModal}
            onClose={handleCloseMessageModal}
            scroll={'paper'}
          >
            {displayMessageModal}
          </Dialog>
        </Box>
      </Box>
      

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
    </Box>
  );
}

export default SafeUI;

//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import { Box, Grid, TextField, Typography } from '@mui/material';
import { StyledSubmitButton } from './Styles/Styled';
import { StyledButton } from './Styles/Styled';
import React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/* Components to implement
 * 1) Welcome Message
 * 2) Receiver Name
 * 3) Subject Line
 * 4) Message Box (2000(+?) input limit)
 * 5) Submit Button
 */
const MAX_CHARACTERS = 7500;
const MAX_SUBJECT_CHARACTERS = 250;
const MAX_EMAIL_CHARACTERS = 256;
function SafeUI() {
  const [characterCount, setCharCount] = useState(0);
  const [subjectCharacterCount, setSubjectCharCount] = useState(0);
  const [to, setTo] = useState('Mark Jones');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [open, setOpen] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);

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
    if (newCharacterCount <= 250) {
      setSubject(newSubject);
      setSubjectCharCount(newCharacterCount);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEmail = e.target.value;
    const newCharacterCount = newEmail.length;
    if (newCharacterCount <= 256) {
      setEmail(newEmail);
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
      console.log(to, subject, message); //Function calling to transfer data from front to back end
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCode(false);
  };

  const handleYes = () => {
    setOpen(false);
    setOpenCode(true);
    if(email !== ''){
      setEmail('');
    }
  };

  const handleEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setHelperText('');

    if (email === '') {
      setEmailError(true);
      setHelperText('This field is required');
    }

    if (email) {
      console.log(email); //Function calling to transfer sender email from front to back end
      setOpenCode(false);
    }
  };

  const isSubmitDisabled = !to || !subject || !message;

  return (
    <Box sx={{ backgroundColor: '#E8F5E9', width: '100vw', height: '100vh' }}>
      <Box sx={{ backgroundColor: '#6a7f10', height: '38px' }} />
      <Typography mt={2} mb={3} variant='h3' align='center' gutterBottom>
        Welcome to <b>SAFE</b>
        <br />
        PSU's CS Department Anonymous Feedback System
      </Typography>
      <Typography mt={2} mb={3} align='center'>
        Find out how we are committed to keeping your identity anonymous!
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} spacing={2} justifyContent='center'>
          <Grid item xs={8}>
            <TextField
              id='label'
              variant='standard'
              label='To:'
              value='Mark Jones'
              //autoComplete=''       Future improvement: Have list of receivers here,
              //                      Could be expanded if SAFE is used by multiple departments
              fullWidth
              //required
              onChange={(e) => setTo(e.target.value)}
              error={toError}
              helperText={helperText}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              id='label'
              variant='standard'
              label='Subject: '
              placeholder='Enter Subject'
              fullWidth
              onChange={handleSubjectChange}
              error={subjectError}
              helperText={helperText}
              inputProps={{ maxLength: MAX_SUBJECT_CHARACTERS }}
            />

            <Grid container justifyContent='flex-end'>
              <Typography mt={2} mb={3} gutterBottom>
                {subjectCharacterCount} / 250
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <TextField
              hiddenLabel
              id='filled-hidden-label-normal'
              placeholder='Enter Message'
              variant='outlined'
              multiline
              rows={7}
              fullWidth
              autoComplete='off'
              spellCheck='false'
              onChange={handleMessageChange}
              error={messageError}
              helperText={helperText}
              inputProps={{ maxlength: MAX_CHARACTERS }}
            />

            <Grid container justifyContent='flex-end'>
              <Typography mt={2} mb={3} gutterBottom>
                {characterCount} / 7500
              </Typography>
            </Grid>

            <Box textAlign='center'>
              <StyledSubmitButton
                variant='contained'
                type='submit'
                disabled={isSubmitDisabled}
              >
                Submit
              </StyledSubmitButton>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Would you like to receive replies to your feedback?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If yes, you will get a code that you can use to check for replies 
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
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"Would you like to receive your code by Email?"}
        </DialogTitle>
        <form noValidate autoComplete='off' onSubmit={handleEmail}>
          <DialogContent>
            <DialogContentText>
              Code: 
            </DialogContentText>
            <DialogContentText>
              Here is your code. If you wish for us to email you the code please enter your email.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              placeholder='Enter Email'
              autoComplete='off'
              spellCheck='false'
              onChange={handleEmailChange}
              error={EmailError}
              helperText={helperText}
              inputProps={{ maxlength: MAX_EMAIL_CHARACTERS }}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleClose}>Cancel</StyledButton>
            <StyledSubmitButton               
              variant='contained'
              type='submit'
              >
                Submit
              </StyledSubmitButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default SafeUI;

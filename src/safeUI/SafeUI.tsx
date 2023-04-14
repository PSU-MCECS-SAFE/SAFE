//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import { Box, Grid, TextField, Typography } from '@mui/material';
import { StyledSubmitButton } from './Styles/Styled';
import React from 'react';
import { lightGreen } from '@mui/material/colors';
import { useState } from 'react';

/* Components to implement
 * 1) Welcome Message
 * 2) Receiver Name
 * 3) Subject Line
 * 4) Message Box (2000(+?) input limit)
 * 5) Submit Button
 */

function SafeUI() {
  const [wordCount, setWordCount] = useState(0);
  const [to, setTo] = useState('Mark Jones');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [helperText, setHelperText] = useState('');

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
      console.log(to, subject, message);
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
              label='To: Mark Jones'
              fullWidth
              //required
              onChange={(e) => setTo(e.target.value)}
              error={toError}
              helperText={helperText}
              disabled={true}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              id='label'
              variant='standard'
              label='Subject: '
              fullWidth
              onChange={(e) => setSubject(e.target.value)}
              error={subjectError}
              helperText={helperText}
            />
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
              onChange={(e) => {
                setMessage(e.target.value);
                setWordCount(
                  e.target.value.trim().split(/\s+/).filter(Boolean).length
                );
              }}
              error={messageError}
              helperText={helperText}
            />

            <Grid container justifyContent='flex-end'>
              <Typography mt={2} mb={3} gutterBottom>
                {wordCount} / 2000
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
    </Box>
  );
}

export default SafeUI;

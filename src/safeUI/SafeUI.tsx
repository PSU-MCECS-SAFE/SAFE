//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import {
  Box,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { StyledSubmitButton } from './Styles/Styled';
import React from 'react';
// import { lightGreen } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

// Function to handle token from reCAPTCHA
function handleToken(token: string) { }

const Captcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Event handler to call verification on button click or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('reCAPTCHA execution failed');
      return;
    }
    const token = await executeRecaptcha();
    handleToken(token);
  }, [executeRecaptcha]);

  // Trigger verification as soon as component is loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return <button onClick={handleReCaptchaVerify}>Verify reCAPTCHA</button>;
};

// Tags to be used to insert CAPTCHA into UI
/*
<GoogleReCaptchaProvider reCaptchaKey="key">
  <Captcha />
</GoogleReCaptchaProvider>
*/

/* Components to implement
 * 1) Welcome Message
 * 2) Receiver Name
 * 3) Subject Line
 * 4) Message Box (2000(+?) input limit)
 * 5) Submit Button
 */
const MAX_CHARACTERS = 7500;
const MAX_Subject_CHARACTERS = 100;
function SafeUI() {
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

      // fetch('http://localhost:3001/message')
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => console.error(error))

      // fetch data from API endpoint
      // param: request method, header, body
      fetch('http://131.252.208.28:3001/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: subject,
          receiver_name: to,
          message: message,
          code: null,
          receive_reply: false,
          has_been_read: false,
          time_submitted: null,
          message_replied: null,
        }),
      })
        // response from fetch
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
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
    handleSnackbarOpen();
  };

  const isSubmitDisabled = !to || !subject || !message;

  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <Box
        sx={{
          backgroundColor: '#6a7f10',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '25px',
        }}
      >
        <img
          src="./PSU_logo_accent_transparent.png"
          alt="Logo"
          width="135"
          height="53"
        />
      </Box>
      <Typography mt={2} mb={3} variant="h3" align="center" gutterBottom>
        Welcome to <b>SAFE</b>
        <br />
        PSU's CS Department Anonymous Feedback System
      </Typography>

      <Typography mt={2} mb={3} align='center'>
        Find out how we are committed to keeping your identity <a href="./about.html" target="blank">anonymous</a>!
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} spacing={2} justifyContent="center">
          <Grid item xs={8}>
            <TextField
              id="label"
              variant="standard"
              label="To:"
              value="Portland State University - Computer Science Department"
              disabled={true} // If prop isn't disabled, text from 'To:' box can be removed.
              // Even though static value remains, text is technically removed
              // preventing submission of button. Text can be further inserted,
              // leaving unneccessary input access to users
              // ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
              //autoComplete=''       Future improvement: Have list of receivers here,
              //                      Could be expanded if SAFE is used by multiple departments
              fullWidth
              //required
              // Bold text for disabled component
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000',
                },
              }}
              onChange={(e) => setTo(e.target.value)}
              error={toError}
              helperText={helperText}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              id="label"
              variant="standard"
              label="Subject:"
              placeholder="Briefly describe your feedback (course feedback, suggestions for improvement...)"
              fullWidth
              onChange={handleSubjectChange}
              error={subjectError}
              helperText={helperText}
              inputProps={{ maxLength: MAX_Subject_CHARACTERS }}
            />

            <Grid container justifyContent="flex-end">
              <Typography mt={2} mb={3} gutterBottom>
                {subjectCharacterCount} / 100
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={8}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="Enter Message"
              variant="outlined"
              multiline
              rows={7}
              fullWidth
              autoComplete="off"
              spellCheck="false"
              onChange={handleMessageChange}
              error={messageError}
              helperText={helperText}
              inputProps={{ maxLength: MAX_CHARACTERS }}
            />

            <Grid container justifyContent="flex-end">
              <Typography mt={2} mb={3} gutterBottom>
                {characterCount} / 7500
              </Typography>
            </Grid>

            <Box textAlign="center">
              <StyledSubmitButton
                variant="contained"
                type="submit"
                disabled={isSubmitDisabled}
                onClick={handleButtonClick}
              >
                Submit
              </StyledSubmitButton>
            </Box>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={open}
              onClose={() => setOpen(false)}
              message="Feedback Successfully sent to PSU's CS Dept."
              autoHideDuration={5000}
            />
            <Typography variant="subtitle2" mt={4} mb={3} align="center">
              This site should not be used to report{' '}
              <Link href="https://www.pdx.edu/diversity/title-ix">
                Title IX
              </Link>{' '}
              violations, including{' '}
              <Link href="https://www.pdx.edu/sexual-assault/faculty-staff-reporting-obligations">
                sexual misconduct
              </Link>{' '}
              or{' '}
              <Link href="https://www.pdx.edu/general-counsel/mandatory-child-abuse-reporting">
                child abuse
              </Link>
              ; please use the respective links for further information. Please
              note also that the{' '}
              <Link href="https://www.pdx.edu/womens-resource-center/">
                Women’s Resource Center
              </Link>{' '}
              also provides a confidential reporting option for the PSU
              community.
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default SafeUI;

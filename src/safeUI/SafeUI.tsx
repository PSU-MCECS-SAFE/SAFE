//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import {
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { StyledSubmitButton } from './Styles/Styled';
import { StyledButton } from "./Styles/Styled";
import React from 'react';
// import { lightGreen } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

// Function to handle token from reCAPTCHA
function handleToken(token: string) {}

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
const MAX_EMAIL_CHARACTERS = 256;
function SafeUI() {
  const [characterCount, setCharCount] = useState(0);
  const [subjectCharacterCount, setSubjectCharCount] = useState(0);
  const [to, setTo] = useState('PSU CS Department');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [open, setOpen] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  const [openInputCodeModal, setOpenInputCodeModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [codeModalHelperText, setCodeModalHelperText] = useState("");

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newEmail = e.target.value;
    const newCharacterCount = newEmail.length;
    if (newCharacterCount <= 256) {
      setEmail(newEmail);
      setValidEmail(emailRegex.test(newEmail));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToError(false);
    setSubjectError(false);
    setMessageError(false);
    setHelperText("");

    if (to === "") {
      setToError(true);
      setHelperText("This field is required");
    }
    if (subject === "") {
      setSubjectError(true);
      setHelperText("This field is required");
    }
    if (message === "") {
      setMessageError(true);
      setHelperText("This field is required");
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
      fetch('http://localhost:3001/addMessage', {
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
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCode(false);
    console.log("receive_reply: false");
  };

  const handleYes = () => {
    setOpen(false);
    setOpenCode(true);
    if (email !== "") {
      setEmail("");
      setEmailError(false);
      setValidEmail(false);
    }
  };

  const handleEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setEmailHelperText("");

    if (email === "") {
      setEmailError(true);
      setEmailHelperText("This field is required");
    } else if (validEmail === false) {
      setEmailError(true);
      setEmailHelperText("Enter a valid email");
    } else {
      console.log(email); //Function calling to transfer sender email from front to back end
      console.log("receive_reply: true");
      setOpenCode(false);
    }
  };

  const handleOpenInputCodeModal = () => {
    setOpenInputCodeModal(true);
  };

  const handleCloseInputCodeModal = () => {
    setOpenInputCodeModal(false);
    setCodeModalHelperText("");
  };

  const handleOpenMessageModal = () => {
    setOpenMessageModal(true);
    setOpenInputCodeModal(false);
  };

  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
  };

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCode === "ABCD") {
      // Check if input code matched the database
      // If not, message will not display, and message prompt for invalid code will be displayed
      handleOpenMessageModal();
      setValidCode(true);
      setCodeModalHelperText("");
    } else {
      setOpenMessageModal(false);
      setValidCode(false);
      setCodeModalHelperText("Code is invalid. Please try another code.");
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

  const uniqueCodeInputModal = (
    <div>
      <DialogTitle> Input Unique Code</DialogTitle>
      <form noValidate autoComplete="off" onSubmit={handleCodeSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter provided unique code to view response
          </DialogContentText>
          <Box textAlign="center" sx={{ padding: "1rem" }}>
            <TextField
              variant="outlined"
              label="Provided Code"
              placeholder="Provided Code"
              helperText={codeModalHelperText}
              sx={{ input: { textAlign: "center" } }}
              onChange={(e) => setInputCode(e.target.value)}
            ></TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseInputCodeModal}>Close</StyledButton>
          <StyledSubmitButton variant="contained" type="submit">
            Submit
          </StyledSubmitButton>
        </DialogActions>
      </form>
    </div>
  );

  const displayMessageModal = (
    <div>
      <DialogTitle sx={{ fontSize: "16px", fontWeight: "bold" }}>
        {" "}
        Message{" "}
      </DialogTitle>
      <DialogContent>
        {/* The 'sx' prop is used to preserve the format of the message when user typed in message box*/}

        <DialogContentText
          sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
        >
          {" "}
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleCloseMessageModal}> Close</StyledButton>
      </DialogActions>
    </div>
  );

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
          src="/PSU_logo_accent_transparent.png"
          alt="Logo"
          width="135"
          height="53"
        />
        <Box textAlign="right" sx={{ height: "38px" }}>
          <StyledButton
            variant="contained"
            onClick={handleOpenInputCodeModal}
            autoFocus
            sx={{
              height: "38px",
              backgroundColor: "#6a7f10",
              color: "rgb(255,255,255)",
              fontSize: "14px",
              paddingLeft: "16px",
              paddingRight: "16px",
              textAlign: "center",
              "&:hover": {
                backgroundColor: "#1d252d",
                color: "#FFFFFF",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
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
            scroll={"paper"}
          >
            {displayMessageModal}
          </Dialog>
        </Box>
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
              inputProps={{ maxLength: MAX_SUBJECT_CHARACTERS }}
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
            If yes, you will get a code that you can use to check back here for
            replies
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
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Would you like to receive your code by Email?"}
        </DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleEmail}>
          <DialogContent>
            <DialogContentText>Code:</DialogContentText>
            <DialogContentText>Code:</DialogContentText>
            <DialogContentText>
              Here is your code. If you wish for us to email you the code please
              enter your email. Your email will not be saved!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              placeholder="Enter Email"
              autoComplete="off"
              spellCheck="false"
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailHelperText}
              inputProps={{ maxlength: MAX_EMAIL_CHARACTERS }}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleClose}>Cancel</StyledButton>
            <StyledSubmitButton variant="contained" type="submit">
              Submit
            </StyledSubmitButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default SafeUI;

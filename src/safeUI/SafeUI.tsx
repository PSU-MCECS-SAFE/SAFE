//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { StyledSubmitButton } from "./Styles/Styled";
import { StyledButton } from "./Styles/Styled";
import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [to, setTo] = useState("Mark Jones");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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
      console.log(to, subject, message); //Function calling to transfer data from front to back end
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
    <Box sx={{ backgroundColor: "#E8F5E9", width: "100vw", height: "100vh" }}>
      <Box sx={{ backgroundColor: "#6a7f10", height: "38px" }}>
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
      <Typography mt={2} mb={3} align="center">
        Find out how we are committed to keeping your identity anonymous!
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} spacing={2} justifyContent="center">
          <Grid item xs={8}>
            <TextField
              id="label"
              variant="standard"
              label="To:"
              value="Mark Jones"
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
              id="label"
              variant="standard"
              label="Subject: "
              placeholder="Enter Subject"
              fullWidth
              onChange={handleSubjectChange}
              error={subjectError}
              helperText={helperText}
              inputProps={{ maxLength: MAX_SUBJECT_CHARACTERS }}
            />

            <Grid container justifyContent="flex-end">
              <Typography mt={2} mb={3} gutterBottom>
                {subjectCharacterCount} / 250
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
              inputProps={{ maxlength: MAX_CHARACTERS }}
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

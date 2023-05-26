import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import React from 'react';
import { StyledButton, StyledSubmitButton } from '../../Styles/Styled';

/* the pop up modal giving the user his reply code
 * Also prompting user for his email is he wants the code sent to him 
 */

function CodeModal({ openCode, handleClose, handleEmail, code, handleEmailChange, emailError, emailHelperText, MAX_EMAIL_CHARACTERS}) {
  return (
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
  );
}

export default CodeModal;
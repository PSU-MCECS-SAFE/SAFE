import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import React from 'react';
import { StyledButton } from '../../Styles/Styled';

/* the pop up modal asking the sender if they want to receive replays
 */

function EmailModal({ openEmail, handleClose, handleYes}) {
  return (
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
  );
}

export default EmailModal;
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

function SubmitError({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          There was an error while submitting your feedback. Please try again
          later.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitError;

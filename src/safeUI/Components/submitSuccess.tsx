import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';

function SubmitSuccess({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Thank you for your feedback!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your feedback successfully sent to PSU's CS Department!
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitSuccess;

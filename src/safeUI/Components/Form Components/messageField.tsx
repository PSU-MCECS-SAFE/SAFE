import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

/* Message Field section for Form component.
 * Displays placeholder text when page initially visited.
 */

function MessageField({ onChange, error, maxCharCount, charCount}) {
  return (
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
      onChange={onChange}
      error={error}
      inputProps={{ maxLength: maxCharCount }}
    />

    <Grid container justifyContent="flex-end">
      <Typography mt={2} mb={3} gutterBottom>
        {charCount} / 7500
      </Typography>
    </Grid>
  </Grid>
  );
}

export default MessageField;
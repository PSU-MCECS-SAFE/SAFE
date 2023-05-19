import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

function SubjectField({ onChange, error, maxCharCount, subCharCount }) {
  return (
    <Grid item xs={8}>
      <TextField
        id="label"
        variant="standard"
        label="Subject:"
        placeholder="Briefly describe your feedback (course feedback, suggestions for improvement...)"
        fullWidth
        onChange={onChange}
        error={error}
        inputProps={{ maxLength: maxCharCount }}
      />

      <Grid container justifyContent="flex-end">
        <Typography mt={2} mb={3} gutterBottom>
          {subCharCount} / 100
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SubjectField;

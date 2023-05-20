import { Grid, TextField } from '@mui/material';
import React from 'react';

/* ToField section for Form component
 * If prop isn't disabled, text from 'To:' field can be removed.
 * Even though static value remains, text is technically removed
 * preventing submission of button. Text can be further inserted,
 * leaving unneccessary input access.
 *
 * Future improvement: Have list of receivers under "autoComplete"
 * textfield prop. This could be expanded if used by multiple depts.
 */

function ToField({ onChange, error }) {
  return (
    <Grid item xs={8}>
      <TextField
        id="label"
        variant="standard"
        label="To:"
        value="Portland State University - Computer Science Department"
        disabled={true}
        fullWidth
        // Bold text for disabled component
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
          },
        }}
        onChange={onChange}
        error={error}
      />
    </Grid>
  );
}

export default ToField;

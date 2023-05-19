import { Grid, TextField } from '@mui/material';
import React from 'react';

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

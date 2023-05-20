import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { StyledSubmitButton } from '../../Styles/Styled';

/* the submit button for the Form component.
 */

function SubmitButton({ disabled, onClick}) {
  return (
    <Grid item xs={8}>
    <Box textAlign="center">
      <StyledSubmitButton
        variant="contained"
        type="submit"
        disabled={disabled}
        onClick={onClick}
      >
        Submit
      </StyledSubmitButton>
    </Box>
  </Grid>
  );
}

export default SubmitButton;
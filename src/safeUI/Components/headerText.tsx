import { Typography } from '@mui/material';
import React from 'react';

function HeaderText() {
  return (
    <div>
      <Typography
        mt={2}
        mb={3}
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontSize: { xs: 18, sm: 25, md: 30, lg: 40 } }}
      >
        Welcome to <b>SAFE</b>
        <br />
        PSU's CS Department Anonymous Feedback System
      </Typography>

      <Typography mt={2} mb={3} align="center">
        Find out how we are committed to keeping your identity{' '}
        <a href="./about.html">anonymous</a>!
      </Typography>
    </div>
  );
}

export default HeaderText;

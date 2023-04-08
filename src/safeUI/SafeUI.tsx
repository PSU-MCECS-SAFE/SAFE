//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

/* Components to implement
 * 1) Welcome Message
 * 2) Receiver Name
 * 3) Subject Line
 * 4) Message Box (2000(+?) input limit)
 * 5) Submit Button
 */

function SafeUI() {
  return (
    <div>
      <Typography mt={2} mb={3} variant="h3" gutterBottom>
        Welcome to <b>SAFE</b>
        <br />
        PSU's CS Department Anonymous Feedback System
      </Typography>
      <Grid container rowSpacing={2} spacing={2}>
        <Grid item xs={8}>
          <TextField id="label" variant="outlined" label="To: " fullWidth />
        </Grid>

        <Grid item xs={8}>
          <TextField
            id="label"
            variant="outlined"
            label="Subject: "
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            placeholder="Enter Message"
            variant="standard"
            multiline
            fullWidth
          />
          <Typography mt={2} mb={3} gutterBottom>
            Character Count 2000
          </Typography>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SafeUI;

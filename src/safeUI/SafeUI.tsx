//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { StyledSubmitButton } from "./Styles/Styled";
import React from "react";
import { lightGreen } from "@mui/material/colors";
import { useState } from "react";

/* Components to implement
 * 1) Welcome Message
 * 2) Receiver Name
 * 3) Subject Line
 * 4) Message Box (2000(+?) input limit)
 * 5) Submit Button
 */

function SafeUI() {
  const [wordCount, setWordCount] = useState(0);

  return (
    <Box sx={{ backgroundColor: "#E8F5E9", width: "100vw", height: "100vh" }}>
      <Box sx={{ backgroundColor: "#6fc092", height: "100px" }} />
      <Typography mt={2} mb={3} variant="h3" align="center" gutterBottom>
        Welcome to <b>SAFE</b>
        <br />
        PSU's CS Department Anonymous Feedback System
      </Typography>
      <Typography mt={2} mb={3} align="center">
        Find out how we are committed to keeping your identity anonymous!
      </Typography>
      <Grid container rowSpacing={2} spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TextField
            id="label"
            variant="standard"
            label="To: "
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            id="label"
            variant="standard"
            label="Subject: "
            fullWidth
          />
        </Grid>
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
            onChange={(e) =>
              setWordCount(
                e.target.value.trim().split(/\s+/).filter(Boolean).length
              )
            }
          />

          <Grid container justifyContent="flex-end">
            <Typography mt={2} mb={3} gutterBottom>
              {wordCount} words
            </Typography>
          </Grid>

          <Box textAlign="center">
            <StyledSubmitButton variant="contained">Submit</StyledSubmitButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SafeUI;

import { styled, Typography, useMediaQuery } from "@mui/material";
import React from "react";

// const responsiveFonts = styled(Typography)(({ theme }) => ({
//     textAlign: 'center',
//     fontSize: '1.5rem',
//     [theme.breakpoints.up('md')]: {
//         fontSize: '2rem',
//     },
// }));

function HeaderText() {
  // const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <div>
      <Typography
        mt={2}
        mb={3}
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontSize: { xs: 20, sm: 25, md: 30 } }}
      >
        Welcome to <b>SAFE</b>
        <br />
        PSU's CS Department Anonymous Feedback System
      </Typography>

      <Typography mt={2} mb={3} align="center">
        Find out how we are committed to keeping your identity{" "}
        <a href="./about.html">anonymous</a>!
      </Typography>
    </div>
  );
}

export default HeaderText;

// This file is implemented as styling for the submit button with properties instead of using
// default properties provided by MUI5.

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: lightGreen[700],
  fontSize: "16px",
  borderRadius: "4px",
  padding: "0.5em 2em",
  boxShadow: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#6a7f10",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "none",
  color: "#6a7f10",
  fontSize: "16px",
  borderRadius: "4px",
  padding: "0.5em 2em",
  boxShadow: "none",
  transition: "all 0.3s ease",
  border: "none",
  "&:hover": {
    backgroundColor: lightGreen[700],
    color: "#FFFFFF",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
}));

import React from "react";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledSubmitButton, StyledButton } from "../../Styles/Styled";
import { Box, TextField } from "@mui/material";

/*Pop Out Modal Asking Users To Input Their Provided Unique Code To View Message
 */

function uniqueCodeInputModal({
  handleCodeSubmit,
  codeModalHelperText,
  handleCloseInputCodeModal,
  setInputCode,
}) {
  return (
    <div>
      <DialogTitle> Input Unique Code</DialogTitle>
      <form noValidate autoComplete="off" onSubmit={handleCodeSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter provided unique code to view response
          </DialogContentText>
          <Box textAlign="center" sx={{ padding: "1rem" }}>
            <TextField
              variant="outlined"
              label="Provided Code"
              placeholder="Provided Code"
              helperText={codeModalHelperText}
              sx={{ input: { textAlign: "center" } }}
              onChange={(e) => setInputCode(e.target.value)}
            ></TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleCloseInputCodeModal}>Close</StyledButton>
          <StyledSubmitButton variant="contained" type="submit">
            Submit
          </StyledSubmitButton>
        </DialogActions>
      </form>
    </div>
  );
}

export default uniqueCodeInputModal;

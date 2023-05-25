import React from "react";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { StyledButton } from "../../Styles/Styled";

function displayMessageModal({ check_message, handleCloseMessageModal }) {
  return (
    <div>
      <DialogTitle sx={{ fontSize: "16px", fontWeight: "bold" }}>
        {" "}
        Message{" "}
      </DialogTitle>
      <DialogContent>
        {check_message && (
          <DialogContentText
            sx={{
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              marginBottom: "16px",
            }}
          >
            <div>
              <strong>Sent Message: </strong> <br />
              {check_message.message}
            </div>
            <div style={{ marginTop: "10px" }}>
              <strong>Reply: </strong> <br />
              {check_message.message_reply}
            </div>
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleCloseMessageModal}> Close</StyledButton>
      </DialogActions>
    </div>
  );
}

export default displayMessageModal;

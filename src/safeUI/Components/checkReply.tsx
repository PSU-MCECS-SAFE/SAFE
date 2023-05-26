import React from "react";

import { Box } from "@mui/material";
import { StyledButton } from "../Styles/Styled";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import displayMessageModal from "./CheckReply Components/displayMessageModal";
import uniqueCodeInputModal from "./CheckReply Components/uniqueCodeModal";
import {
  handleOpenInputCodeModal,
  handleCloseInputCodeModal,
  handleOpenMessageModal,
  handleCloseMessageModal,
  handleCodeSubmit,
} from "./checkReplyEvenHandler";

const port = 3001;

function CheckReply() {
  const [check_message, setcheck_message] = useState<any>(null);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [validCode, setValidCode] = useState(false);
  const [codeModalHelperText, setCodeModalHelperText] = useState("");
  const [openInputCodeModal, setOpenInputCodeModal] = useState(false);

  // // CHECK REPLY button main function
  // const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // fetching getmessage endpoint and pass in inputCode in url
  //   fetch(
  //     `http://131.252.208.28:${port}/getmessage?code=${encodeURIComponent(
  //       inputCode
  //     )}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     // response from fetch
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((responseJson) => {
  //       console.log(responseJson);
  //       setcheck_message(responseJson);
  //       handleOpenMessageModal(setOpenMessageModal, setOpenInputCodeModal);
  //       setValidCode(true);
  //       setCodeModalHelperText("");
  //     })
  //     // If catching error from endpoint, display error message
  //     .catch((error) => {
  //       console.log(error);
  //       setOpenMessageModal(false);
  //       setValidCode(false);
  //       setCodeModalHelperText("Code is invalid. Please try another code.");
  //     });
  // };

  return (
    //  {/* below are additional features code */}
    <Box textAlign="right" sx={{ height: "38px" }}>
      <StyledButton
        variant="contained"
        onClick={() => handleOpenInputCodeModal(setOpenInputCodeModal)}
        autoFocus
        sx={{
          height: "38px",
          backgroundColor: "#6a7f10",
          color: "rgb(255,255,255)",
          fontSize: "14px",
          justifyContent: "space-between",
          paddingLeft: "16px",
          paddingRight: "16px",
          textAlign: "center",
          "&:hover": {
            backgroundColor: "#1d252d",
            color: "#FFFFFF",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        Check Reply
      </StyledButton>
      <Dialog
        open={openInputCodeModal}
        onClose={() =>
          handleCloseInputCodeModal(
            setOpenInputCodeModal,
            setCodeModalHelperText
          )
        }
      >
        {uniqueCodeInputModal({
          handleCodeSubmit: (event) =>
            handleCodeSubmit(
              event,
              port,
              inputCode,
              setcheck_message,
              handleOpenMessageModal,
              setOpenMessageModal,
              setOpenInputCodeModal,
              setValidCode,
              setCodeModalHelperText
            ),
          codeModalHelperText,
          handleCloseInputCodeModal: () =>
            handleCloseInputCodeModal(
              setOpenInputCodeModal,
              setCodeModalHelperText
            ),
          setInputCode,
        })}
      </Dialog>
      <Dialog
        open={openMessageModal}
        onClose={() => handleCloseMessageModal(setOpenMessageModal)}
        scroll={"paper"}
      >
        {displayMessageModal({
          check_message,
          handleCloseMessageModal: () =>
            handleCloseMessageModal(setOpenMessageModal),
        })}
      </Dialog>
    </Box>
  );
}

export default CheckReply;

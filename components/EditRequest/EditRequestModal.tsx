import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Modal } from "@mui/material";
import "./style.css";

import submitComment from "./EditRequest.util";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
};
const EditRequestModal = ({
  isOpen,
  setOpenEditModal,
  editRequestDetails,
}: {
  isOpen: any;
  setOpenEditModal: any;
  editRequestDetails: any;
}) => {
  const [open, setOpen] = useState(isOpen);
  const [comment, setComment] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = (event: any, reason: string) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
    setOpenEditModal(false);
  };

  useEffect(() => {
    if (isOpen) handleOpen();
  }, [isOpen]);

  const onSubmit = () => {
    if (comment.length > 0) {
      // alert("Thank you for your time, we will consider you comment/suggestion");
      submitComment({
        id: editRequestDetails.id,
        title: editRequestDetails.title,
        comment: comment,
        setComment: setComment,
        setOpen: setOpen,
        setOpenEditModal: setOpenEditModal,
      });
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Comment Regarding - <strong>{editRequestDetails.title}</strong>
          </Typography>
          <TextField
            multiline
            variant="outlined"
            label="Comments"
            value={comment}
            className="commentBox"
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setDisableSubmitButton(false);
              } else {
                setDisableSubmitButton(true);
              }
              setComment(e.target.value);
            }}
          ></TextField>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              mt: 1,
            }}
          >
            <Button
              disabled={disableSubmitButton}
              variant="outlined"
              type="button"
              onClick={() => {
                onSubmit();
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                setOpenEditModal(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default EditRequestModal;

import React from "react";
import PostForm from "./PostForm";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalForm = ({ showModal, isShowModal }) => {
  const handleClose = () => isShowModal(false);

  return (
    <Modal
    showModal={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <PostForm isShowModal={isShowModal}/>
      </Box>
    </Modal>
  );
};

export default ModalForm;

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Snackbar } from "@mui/material";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return createPortal(
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={true}
      onClose={onClose}
      message={message}
      autoHideDuration={3000}
    />,
    document.body
  );
};

export default Toast;

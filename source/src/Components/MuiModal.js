import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function MuiModal({
  isOpen,
  toggleModal,
  children,
  title,
  footer,
  maxWidth,
}) {
  return (
    <BootstrapDialog
      maxWidth={maxWidth ?? "sm"}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      {title && (
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={toggleModal}
        >
          {title}
        </BootstrapDialogTitle>
      )}
      {children && <DialogContent dividers>{children}</DialogContent>}
      {footer && <DialogActions>{footer}</DialogActions>}
    </BootstrapDialog>
  );
}

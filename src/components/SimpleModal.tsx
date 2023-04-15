// components/SimpleModal.tsx

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface SimpleModalProps {
  isOpen: boolean;
  onButtonClick: () => void;
  onClose: () => void;
  chainId: number;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onButtonClick, onClose, chainId }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{"Warning"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are not currently in {chainId === 80001 ? "Mumbai" : "Linea"}, Please change network before.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onButtonClick}>Change network</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleModal;

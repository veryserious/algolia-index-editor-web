import { Dialog } from "@mui/material";
import ModalContent from "./ModalContent";

interface ModalProps {
  children: React.ReactElement;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open = false, onClose }: ModalProps) {
  return (
    <Dialog
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md"
    >
      {children}
    </Dialog>
  );
}

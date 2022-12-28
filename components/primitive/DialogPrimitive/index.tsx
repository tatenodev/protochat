import { styled, keyframes } from "@stitches/react";
import * as Dialog from "@radix-ui/react-dialog";

const overlayShow = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const contentShow = keyframes({
  from: { opacity: 0, transform: `translate(-50%, -48%) scale(0.96)` },
  to: { opacity: 1, transform: `translate(-50%, -50%) scale(1)` },
});

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: "White",
  borderRadius: "6px",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: "25px",
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

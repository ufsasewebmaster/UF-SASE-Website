import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={modalOverlayStyles}>
      <div className="modal-content" style={modalContentStyles}>
        <img
          src={imageUrl}
          alt="Modal"
          style={{ width: "100%", height: "auto" }}
        />
        <button onClick={onClose} style={closeButtonStyles}>
          Close
        </button>
      </div>
    </div>
  );
};

// Inline styles for simplicity
const modalOverlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  position: "relative",
  maxWidth: "90%",
};

const closeButtonStyles: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "10px",
};

export default Modal;

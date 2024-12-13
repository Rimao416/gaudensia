import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayStyle?: React.CSSProperties; // Style pour l'overlay
  containerStyle?: React.CSSProperties; // Style pour le conteneur
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayStyle,
  containerStyle,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" style={overlayStyle}>
      <div className="modal-container" style={containerStyle}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, description, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    // This wrapper ensures the modal is fixed and covers the entire viewport.
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center bg-black/50">
      <div className="relative max-w-lg rounded-md bg-white p-6">
        {title && <h2 className="mb-2 text-xl font-semibold">{title}</h2>}
        {description && <p className="mb-4">{description}</p>}
        {children}
        <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        {/* Content */}
        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-full max-w-md p-6 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        >
          {/* Title */}
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>

          {/* Description */}
          {description && (
            <Dialog.Description className="mt-2 text-sm text-gray-600">
              {description}
            </Dialog.Description>
          )}

          {/* Close Button */}
          <Dialog.Close
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </Dialog.Close>

          {/* Modal Content */}
          <div className="mt-4">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
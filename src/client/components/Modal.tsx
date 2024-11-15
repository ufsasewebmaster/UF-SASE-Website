import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  children,
  description,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        {/* Content */}
        <Dialog.Content className="max-w-4x1 fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 focus:outline-none">
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
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </Dialog.Close>

          {/* Modal Content */}
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

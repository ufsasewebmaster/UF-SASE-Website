import { Icon } from "@iconify/react";
import { Button } from "@ui/button";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  description?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ category, children, description, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex animate-fade-in items-center justify-center bg-black/50">
      <div className="relative max-h-[80vh] w-[80vw] max-w-[1200px] animate-zoom-fade-in overflow-auto rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-3">
          {title && (
            <h2 className="font-redhat text-xl">
              {category && <span className="font-semibold">{category}:</span>} <span>{title}</span>
            </h2>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon icon="mdi:close" className="h-6 w-6" />
          </Button>
        </div>
        {description && <p className="px-6 py-2">{description}</p>}
        <div className="overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

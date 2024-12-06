import { Button } from "@ui/button";
import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-saseBlue">Success!</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <Button onClick={onClose} className="w-full bg-saseBlueLight text-white hover:bg-saseBlue">
          Continue
        </Button>
      </div>
    </div>
  );
};

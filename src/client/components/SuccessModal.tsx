import React from 'react';
import { Button } from '@ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-saseBlue">Success!</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <Button 
          onClick={onClose} 
          className="w-full bg-saseBlueLight text-white hover:bg-saseBlue"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
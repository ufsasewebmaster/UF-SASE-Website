import React, { useState } from "react";
import Modal from "@components/Modal";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, buttonLabel = "Open Image" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {buttonLabel}
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Image Preview" description="This is a preview of the selected image.">
          <img src={imageUrl} alt="Modal Content" className="max-w-full max-h-[80vh] mx-auto" />
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

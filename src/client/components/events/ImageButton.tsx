import React, { useState } from "react";
import Modal from "@/client/components/Modal";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
  slideUrl: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, buttonLabel = "Open Image", slideUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <img 
        src={imageUrl}
        onClick={openModal}
        className="cursor-pointer max-w-sm px-40 py-10 hover:opacity-90 focus:outline-none"
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Image Preview" description="This is a preview of the selected image.">
          <iframe src={slideUrl} width="960" height="569"></iframe>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

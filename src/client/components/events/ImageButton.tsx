import Modal from "@/client/components/Modal";
import React, { useState } from "react";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
  slideUrl: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, slideUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <img src={imageUrl} onClick={openModal} className="max-w-sm cursor-pointer px-40 py-10 hover:opacity-90 focus:outline-none" />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Image Preview" description="This is a preview of the selected image.">
          <iframe src={slideUrl} width="960" height="569"></iframe>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

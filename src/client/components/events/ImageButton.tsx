import React, { useState } from "react";
import Modal from "@/client/components/Modal";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
  slideUrl: string;
  title?: string;
  description: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, buttonLabel = "Open Image", slideUrl, title="", description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <img 
        src={imageUrl}
        onClick={openModal}
        className="cursor-pointer border-2 border-black rounded-xl hover:opacity-90 focus:outline-none"
        style={{width: '300px', height: '200px', marginLeft: '125px', marginTop: '50px', marginBottom: '50px'}}
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={title} description={description}>
          <iframe src={slideUrl} width="960" height="569"></iframe>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

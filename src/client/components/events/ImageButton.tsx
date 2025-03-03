import Modal from "@/client/components/Modal";
import React, { useState } from "react";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
  slideUrl: string;
  imgWidth?: string;
  imgHeight?: string;
  title: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, imgWidth = "320px", slideUrl, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className="relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg hover:opacity-90 focus:outline-none"
        style={{ width: imgWidth }}
        onClick={openModal}
      >
        <img src={imageUrl} alt="Slide thumbnail" className="absolute left-0 top-0 h-full w-full object-cover" />
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={title} description="">
          <iframe src={slideUrl} className="h-[60vh] w-full" allowFullScreen />
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

import Modal from "@/client/components/Modal";
import React, { useState } from "react";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
  slideUrl: string;
  imgWidth?: string;
  imgHeight?: string;
  title: string;
  category: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, slideUrl, imgWidth = "320px", title, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="group relative inline-block">
        <div className="absolute left-0 top-0 z-0 h-full w-full translate-x-4 translate-y-4 rounded-lg bg-gradient-to-b from-saseGreen to-saseBlue opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
        <div
          className="relative z-10 aspect-[16/9] cursor-pointer overflow-hidden rounded-lg border-2 border-black transition-transform duration-300 ease-in-out group-hover:scale-105 focus:outline-none"
          style={{ width: imgWidth }}
          onClick={openModal}
        >
          <img src={imageUrl} alt="Slide thumbnail" className="absolute left-0 top-0 h-full w-full object-cover" />
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={title} category={category} description="">
          <div className="relative w-full pt-[56.25%]">
            <iframe src={slideUrl} className="absolute left-0 top-0 h-full w-full rounded-lg" allowFullScreen />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

import Modal from "@/client/components/Modal";
import React, { useState } from "react";

interface ImageButtonProps {
  imageUrl: string;
  buttonLabel?: string;
  slideUrl: string;
  imgWidth?: string;
  imgHeight?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ imageUrl, imgWidth = "320px", slideUrl }) => {
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
        <Modal isOpen={isModalOpen} title="" description="" onClose={closeModal}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5">
            <div className="relative flex h-[80vh] max-h-[700px] w-[80vw] max-w-[1200px] items-center justify-center rounded-lg bg-white shadow-lg">
              <button onClick={closeModal} className="absolute left-5 top-5 z-10 rounded-full bg-black p-2 text-white">
                X
              </button>
              <div className="relative aspect-[16/9] h-full w-full">
                <iframe src={slideUrl} className="absolute left-0 top-0 h-full w-full rounded-lg" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

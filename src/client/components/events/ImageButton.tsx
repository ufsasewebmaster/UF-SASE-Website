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
      <img src={imageUrl} onClick={openModal} className="h-[180px] w-[320px] cursor-pointer hover:opacity-90 focus:outline-none" />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Image Preview" description="This is a preview of the selected image.">
          <div className="relative min-h-[290px] w-full min-w-[450px] pb-[56.25%]">
            {" "}
            {/* Aspect ratio 16:9 */}
            <iframe src={slideUrl} className="absolute left-0 top-0 h-full w-full" allowFullScreen></iframe>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

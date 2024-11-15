import Modal from "@/client/components/Modal";
import React, { useState } from "react";

interface ImageButtonProps {
  imageUrl: string;
  slideUrl: string;
  title?: string;
  description: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  description,
  imageUrl,
  slideUrl,
  title = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <img
        src={imageUrl}
        onClick={openModal}
        className="cursor-pointer rounded-xl border-2 border-black hover:opacity-90 focus:outline-none"
        style={{
          width: "300px",
          height: "200px",
          marginLeft: "125px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={title}
          description={description}
        >
          <iframe src={slideUrl} width="960" height="569"></iframe>
        </Modal>
      )}
    </div>
  );
};

export default ImageButton;

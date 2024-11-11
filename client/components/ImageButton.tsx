import React, { useState } from "react";
import Modal from "./Modal"; // Make sure to adjust the path based on your file structure

const ImageButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} style={buttonStyles}>
        Open Image
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl="client/assets/ProfesionalDevelopment_Home.png" // Replace with your image URL
      />
    </div>
  );
};

// Inline styles for button
const buttonStyles: React.CSSProperties = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ImageButton;

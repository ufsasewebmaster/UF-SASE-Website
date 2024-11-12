import React, { useState } from "react";

const GalleryDropdown = () => {
  // Step 1: Create state variable for controlling visibility
  const [isVisible, setIsVisible] = useState(true);

  // Step 2: Create onClick handler to toggle visibility
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState); // Toggle between true and false
  };

  return (
    <div>
      {/* Step 3: Div that will be clicked to toggle the visibility */}
      <div
        onClick={toggleVisibility}
        style={{ padding: "10px", background: "lightblue", cursor: "pointer" }}
      >
        Photo Google Drives
      </div>

      {/* Step 4: Conditional rendering of the target div */}
      {isVisible && (
        <div
          style={{
            padding: "20px",
            marginTop: "10px",
            background: "lightgreen",
          }}
        >
          This is the content that can be shown or hidden.
        </div>
      )}
    </div>
  );
};

export default GalleryDropdown;

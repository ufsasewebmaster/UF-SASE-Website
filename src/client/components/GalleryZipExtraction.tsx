import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const GalleryZipExtraction: React.FC = () => {
  // List of image paths inside the 'public/assets' folder
  const images = [
    "/assets/fall2024_1.JPG",
    "/assets/fall2024_4.JPG",
    "/assets/fall2024_5.JPG",
    "/assets/fall2024_6.JPG",
    "/assets/fall2024_7.JPG",
    "/assets/fall2024_9.JPG",
    "/assets/fall2024_10.JPG",
    "/assets/fall2024_2.jpg",
    "/assets/fall2024_3.jpeg",
    "/assets/fall2024_8.jpg",
    "/assets/fall2024_12.jpg",
    "/assets/fall2024_13.jpg",
  ];

  // State to track the current index of the image being displayed
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Function to go to the next image
  const nextImage = () => {
    console.log("Next Image");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Wrap around to the first image
  };

  // Function to go to the previous image
  const prevImage = () => {
    console.log("Next Image");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length, // Wrap around to the last image
    );
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-3/12 flex-1"></div> {/* spacer element */}
      <div className="flex items-center justify-center">
        <div className="cursor-pointer" onClick={prevImage}>
          {/* Left Arrow */}
          <button className="text-4xl">
            <FaChevronLeft />
          </button>
        </div>
        <div>
          {/* Image */}
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="h-96 w-full rounded-lg border-2 border-black object-cover"
          />
        </div>
        <div className="cursor-pointer" onClick={nextImage}>
          {/* Right Arrow */}
          <button className="text-4xl">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="w-3/12 flex-1"></div> {/* spacer element */}
    </div>
  );
};

export default GalleryZipExtraction;

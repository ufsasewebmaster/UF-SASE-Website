import { imageUrls } from "@assets/imageUrls";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ZipProps {
  slideshow: string;
}

const GalleryZipExtraction: React.FC<ZipProps> = ({ slideshow }) => {
  // List of image paths inside the 'public/assets' folder
  const fall2024_images = [imageUrls["fall2024_1.JPG"], imageUrls["fall2024_4.JPG"], imageUrls["fall2024_5.JPG"], imageUrls["fall2024_6.JPG"]];

  const spring2024_images = [imageUrls["fall2024_7.JPG"], imageUrls["fall2024_9.JPG"], imageUrls["fall2024_10.JPG"], imageUrls["fall2024_2.jpg"]];

  const fall2023_images = [imageUrls["fall2024_3.jpeg"], imageUrls["fall2024_8.jpg"], imageUrls["fall2024_12.jpg"], imageUrls["fall2024_13.jpg"]];

  let images;

  if (slideshow == "Fall 2024") {
    images = fall2024_images;
  } else if (slideshow == "Spring 2024") {
    images = spring2024_images;
  } else {
    images = fall2023_images;
  }

  // State to track the current index of the image being displayed
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Wrap around to the first image
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length, // Wrap around to the last image
    );
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="cursor-pointer px-[8%] transition hover:scale-125 hover:opacity-45" onClick={prevImage}>
          {/* Left Arrow */}
          <button className="text-4xl">
            <FaChevronLeft />
          </button>
        </div>
        <div className="rounded-lg shadow-[10px_10px_0px_0px_rgb(6,104,179)]">
          {/* Image */}
          <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="w-full rounded-lg border-2 border-black object-cover" />
        </div>
        <div className="cursor-pointer px-[8%] transition hover:scale-125 hover:opacity-45" onClick={nextImage}>
          {/* Right Arrow */}
          <button className="text-4xl">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryZipExtraction;

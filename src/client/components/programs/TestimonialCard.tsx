import React from "react";
import Star from "../../assets/programs/star.png";

interface TestimonialCardProps {
  image: string;
  text: string;
  name: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  image,
  name,
  text,
  title,
}) => {
  return (
    <div className="mb-24 flex max-w-7xl items-center bg-white p-6">
      {/* Image Section */}
      <div className="relative flex-shrink-0 rounded-3xl border-2 border-black shadow-[18px_18px_0px_#7DC242]">
        <img
          src={image}
          alt={name}
          className="h-[500px] w-[400px] rounded-3xl object-cover"
        />
        {/* Decorative Icon */}
        <img
          src={Star}
          alt="Decorative star"
          className="absolute -bottom-6 -left-9 h-20 w-20"
        />
      </div>

      {/* Text Section */}
      <div className="ml-24 border-l-4 border-saseGreen pl-6">
        <p className="mb-4 text-3xl text-gray-800">“{text}”</p>
        <p className="font-semibold text-saseGreen">
          {name}, {title}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;

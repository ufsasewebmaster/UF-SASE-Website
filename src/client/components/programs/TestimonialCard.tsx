import { imageUrls } from "@/client/assets/imageUrls";
import React from "react";

interface TestimonialCardProps {
  image: string;
  text: string;
  name: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, text, title }) => {
  return (
    <div className="mb-24 flex max-w-7xl flex-col items-center gap-12 bg-background p-6 md:flex-row">
      {/* Image Section */}
      <div className="relative flex-shrink-0 rounded-3xl border-2 border-border shadow-[18px_18px_0px_#7DC242]">
        <img src={image} alt={name} className="h-[500px] w-[400px] rounded-3xl object-cover" />
        {/* Decorative Icon */}
        <img src={imageUrls["Star.png"]} alt="Decorative star" className="absolute -bottom-6 -left-9 h-20 w-20" />
      </div>

      {/* Text Section */}
      <div className="border-l-4 border-saseGreen pl-6">
        <p className="mb-4 text-3xl text-muted-foreground">“{text}”</p>
        <p className="font-semibold text-saseGreen">
          {name}, {title}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;

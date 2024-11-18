// TitleUnderline.tsx

import React from "react";

interface TitleUnderlineProps {
  position?: "top" | "bottom";
  offset?: string;
  thickness?: string;
  color?: string;
}

const TitleUnderline: React.FC<TitleUnderlineProps> = ({
  color = "bg-saseGreen",
  offset = "-1.5rem",
  position = "top",
  thickness = "0.5rem",
}) => {
  const positionStyle =
    position === "top" ? { top: offset } : { bottom: offset };

  return (
    <div
      className={`absolute left-0 right-0`}
      style={{
        ...positionStyle,
        height: thickness,
      }}
    >
      <div className={`h-full w-full ${color}`}></div>
    </div>
  );
};

export default TitleUnderline;

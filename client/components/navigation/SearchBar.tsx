import { cn } from "@/shared/utils";
import React from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  placeholder = "Search",
}) => (
  <div className={cn(`relative`, className)}>
    <input
      type="text"
      placeholder={placeholder}
      className="w-32 rounded-full border border-gray-600 py-2 pl-10 pr-3 placeholder-gray-600 transition-all duration-300 ease-in-out focus:w-64 focus:outline-none"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-3 top-3 h-5 w-5 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-4l4 4"
      />
    </svg>
  </div>
);

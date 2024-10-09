import React from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = "", placeholder = "Search" }) => (
  <div className={`relative ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      className="border border-gray-600 pl-10 pr-3 py-2 rounded-full focus:outline-none transition-all duration-300 ease-in-out w-32 focus:w-64 placeholder-gray-600"
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
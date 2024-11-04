// NotFound.tsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-2xl">Oops! Page Not Found</p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;

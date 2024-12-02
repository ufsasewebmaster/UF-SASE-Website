import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  component: () => {
    // basic counter
    const [count, setCount] = useState(0);

    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-xl">You have clicked the button {count} times.</p>
        <button onClick={() => setCount(count + 1)} className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Click me
        </button>
      </div>
    );
  },
});

import type { ReactNode } from "react";

const BlogContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative mx-auto mt-5 max-w-6xl rounded-[70px] bg-gradient-to-tr from-gray-50 from-30% via-greenShadow to-saseGreenLight p-6 shadow-md">
      {/* blue shadow */}
      <div
        className="absolute right-0 top-0 z-0 h-1/3 w-1/3 rounded-[70px]"
        style={{
          background: "radial-gradient(circle at top right, #A8D8F0, transparent 50%)",
        }}
      ></div>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[70px]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="borderGradient" gradientUnits="userSpaceOnUse" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#7DC242" /> {/* saseGreen */}
              <stop offset="10%" stopColor="#3B9080" /> {/* saseTeal */}
              <stop offset="30%" stopColor="#0668B3" /> {/* saseBlue */}
              <stop offset="70%" stopColor="#7DC242" /> {/* saseGreen */}
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          <rect
            x="5"
            y="5"
            width="calc(100% - 10px)"
            height="calc(100% - 10px)"
            rx="65px"
            ry="65px"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="6"
            strokeDasharray="15 15"
          />
        </svg>
      </div>

      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default BlogContainer;

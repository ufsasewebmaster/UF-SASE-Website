import React, { useEffect, useRef, useState } from "react";
import ShadowCard from "./AuthShadowCard";

const AuthLayout = ({ children, isSignUp }: { children: React.ReactNode; isSignUp: boolean }) => {
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (formRef.current) {
          setFormHeight(formRef.current.offsetHeight);
        }
      });

      resizeObserver.observe(formRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <ShadowCard formHeight={formHeight} isSignUp={isSignUp} />
      <div ref={formRef} className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

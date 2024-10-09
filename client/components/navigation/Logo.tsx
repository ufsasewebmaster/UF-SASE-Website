import React from "react";
import { Link } from "@tanstack/react-router";

export const Logo = () => (
  <Link to="/">
    <img
      className="w-40 md:w-44 cursor-pointer transform hover:scale-105 transition duration-300"
      src="/client/assets/images/SASELogo.png"
      alt="Logo"
    />
  </Link>
);
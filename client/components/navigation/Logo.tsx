import { Link } from "@tanstack/react-router";
import React from "react";

export const Logo = () => (
  <Link to="/">
    <img
      className="w-40 transform cursor-pointer transition duration-300 hover:scale-105 md:w-44"
      src="/client/assets/images/SASELogo.png"
      alt="Logo"
    />
  </Link>
);

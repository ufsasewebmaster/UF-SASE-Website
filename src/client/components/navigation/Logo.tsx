import { Link } from "@tanstack/react-router";
import SASELogo from "../../assets/SASELogo.png";

export const Logo = () => (
  <Link to="/">
    <img
      className="w-40 transform cursor-pointer transition duration-300 hover:scale-105 md:w-44"
      src={SASELogo}
      alt="Logo"
    />
  </Link>
);

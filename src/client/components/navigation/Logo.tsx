import { imageUrls } from "@/client/assets/imageUrls";
import { Link } from "@tanstack/react-router";

export const Logo = () => (
  <Link to="/">
    <img className="w-40 transform cursor-pointer transition duration-300 hover:scale-105 md:w-44" src={imageUrls["SASELogo.png"]} alt="Logo" />
  </Link>
);

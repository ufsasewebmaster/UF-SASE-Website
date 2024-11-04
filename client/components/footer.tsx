import { Link } from "@tanstack/react-router";
import React from "react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#acc9fa",
        paddingTop: "30px",
        paddingBottom: "30px",
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "0px",
            marginLeft: "1.5em",
          }}
        >
          <Button asChild variant="link" size="default">
            <span>Home</span>
          </Button>

          <Button asChild variant="link" size="default">
            <Link to="/about">About</Link>
          </Button>

          <Button asChild variant="link" size="default">
            <span>Board</span>
          </Button>

          <Button asChild variant="link" size="default">
            <span>Gallery</span>
          </Button>

          <Button asChild variant="link" size="default">
            <span>Events & Slides</span>
          </Button>

          <Button asChild variant="link" size="default">
            <span>Sports</span>
          </Button>

          <Button asChild variant="link" size="default">
            <span>Blogs</span>
          </Button>

          <Button asChild variant="link" size="default">
            <span>Contact Us</span>
          </Button>
        </div>

        <div
          style={{
            marginLeft: "29em",
            marginTop: "10px",
          }}
        >
          <p>&copy; Copyright 2024 - Yuki Theme By WP Moose.</p>
        </div>
      </div>
    </footer>
  );
};

// Old footer:
{
  /* <div className="flex flex-col justify-center w-full pt-24 ">
  <div className="flex-1">
    <hr className="pt-10 h-1 border-t-1 border-black w-full" />
  </div>
  <div className="flex-1 pl-32">
    <i className="fab fa-instagram pr-10"></i>
    <i className="fab fa-discord pr-10"></i>
    <i className="fab fa-facebook"></i>
  </div>
  <div className="flex-1 pt-10">
    <hr className="pt-5 h-1 border-t-1 border-black w-full" />
  </div>
  <div className="flex justify-between pt-5">
    <div className="pl-28"></div>
    <div className="flex flex-1 text-xs font-redhat">
      <div className="pr-2">Home</div>
      <div className="pl-2 pr-2">About</div>
      <div className="pl-2 pr-2">Board</div>
      <div className="pl-2 pr-2">Gallery</div>
      <div className="pl-2 pr-2">Events & Slides</div>
      <div className="pl-2 pr-2">Sports</div>
      <div className="pl-2 pr-2">Sponsors</div>
      <div className="pl-2 pr-2">Blogs</div>
      <div className="pl-2 pr-2">Contact Us</div>
    </div>
    <div className="text-xs font-redhat">
      Copyright <i className="fas fa-copyright"></i> 2024 - Yuki Theme
      by WP Moose
    </div>
    <div className="pr-28"></div>
  </div>
</div> */
}

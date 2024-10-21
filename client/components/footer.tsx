import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import React from "react";

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
            <Link to="/About">About</Link>
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

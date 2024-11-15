import React from "react";
import eventInfo from "./EventInfo";

const FeaturedEvent = () => {
  return (
    <div
      className="relative w-4/5"
      style={{
        width: "30%",
        height: "300px",
        minWidth: "200px",
        zIndex: 1,
        position: "relative",
      }}
    >
      {eventInfo.map((event, index) => (
        <div key={index}>
          <h2>{event.name}</h2>
          <img src={event.image} alt={event.name} />
          <p>{event.date.toDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedEvent;

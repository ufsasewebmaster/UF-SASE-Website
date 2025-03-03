const EventsCalendar = () => (
  <div className="relative w-4/5">
    <div
      className="absolute left-3 top-3 h-full w-full rounded-xl bg-gradient-to-b from-saseGreen to-saseBlue transition-all duration-300 ease-in-out group-hover:bg-gradient-to-b group-hover:from-saseGreen group-hover:to-saseBlue"
      style={{ width: "60%", height: "550px", minWidth: "550px", zIndex: 1 }}
    ></div>

    <iframe
      src="https://calendar.google.com/calendar/embed?src=47b916a8ac315c88c4dc86bb240cbd1bf1bfdae1800445aa534d7fd1818badcf%40group.calendar.google.com&ctz=America%2FNew_York"
      style={{
        border: "2px solid black",
        borderRadius: "15px",
        zIndex: 2,
        position: "relative",
        width: "60%",
        height: "550px",
        minWidth: "550px",
      }}
      frameBorder="0"
      scrolling="no"
    ></iframe>
  </div>
);

export default EventsCalendar;

const EventsCalendar = () => (
  <div className="group relative" style={{ width: "60%", height: "550px", minWidth: "550px" }}>
    <div className="pointer-events-none absolute left-3 top-3 z-0 h-full w-full rounded-xl bg-gradient-to-b from-saseGreen to-saseBlue opacity-100 transition-opacity duration-700 ease-in-out group-hover:opacity-0"></div>
    <div className="pointer-events-none absolute left-3 top-3 z-0 h-full w-full rounded-xl bg-gradient-to-b from-saseBlue to-saseGreen opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"></div>

    <iframe
      src="https://calendar.google.com/calendar/embed?src=47b916a8ac315c88c4dc86bb240cbd1bf1bfdae1800445aa534d7fd1818badcf%40group.calendar.google.com&ctz=America%2FNew_York"
      style={{
        border: "2px solid black",
        borderRadius: "15px",
        zIndex: 2,
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      frameBorder="0"
      scrolling="no"
    ></iframe>
  </div>
);

export default EventsCalendar;

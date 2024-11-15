const EventsCalendar = () => (
  <div className="relative w-4/5">
    <div
      className="absolute left-3 top-3 h-full w-full rounded-lg bg-blueShadow"
      style={{ width: "60%", height: "550px", minWidth: "550px" }} // Removed zIndex
    ></div>

    <iframe
      src="https://calendar.google.com/calendar/embed?src=47b916a8ac315c88c4dc86bb240cbd1bf1bfdae1800445aa534d7fd1818badcf%40group.calendar.google.com&ctz=America%2FNew_York"
      className="relative z-10 h-[550px] w-[60%] min-w-[550px] rounded-lg border-2 border-black" // Adjusted zIndex if needed
      frameBorder="0"
      scrolling="no"
    ></iframe>
  </div>
);

export default EventsCalendar;

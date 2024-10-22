const YouTubeVideoSection = () => (
  <div
    className="w-full rounded-xl border border-black bg-gray-200 p-2 transition-shadow duration-300 hover:shadow-xl md:w-3/5"
    style={{ height: "455px" }}
  >
    <iframe
      className="h-full w-full rounded-md"
      src="https://www.youtube.com/embed/JV9HAUhVet8"
      title="UF SASE Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default YouTubeVideoSection;

import { cn } from "@/shared/utils";
import React, { useEffect, useRef, useState } from "react";
import ImageButton from "./ImageButton";

interface SlideData {
  category: string;
  name: string;
  date: Date;
  semester: string;
  embed_url: string;
  thumbnail_url: string;
  relative_order: number;
}

interface Semester {
  name: string;
  slides: Array<SlideData>;
}

const EventsSlides: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [view, setView] = useState<"slides" | "recordings">("slides");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<Array<Semester>>([]);
  const fetchedSlides = useRef(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        if (fetchedSlides.current) return;
        fetchedSlides.current = true;
        setLoading(true);

        const resp = await fetch("api/events/slides/", { method: "GET" });
        const slideData = (await resp.json()) as Array<SlideData>;

        const display: Array<Semester> = [];
        slideData.forEach((deck) => {
          if (display.length == 0 || deck.semester !== display[display.length - 1].name) {
            display.push({ name: deck.semester, slides: [] });
          }
          display[display.length - 1].slides.push(deck);
        });
        setSemesters(display);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("Slides could not be fetched", error);
      }
    })();
  }, []);

  return (
    <div className="relative flex w-screen flex-col items-center gap-5 p-5">
      {semesters.length > 0 && (
        <div className="mb-6 flex w-full gap-4 border-b-2 border-gray-300">
          {semesters.map((semester) => (
            <button
              key={semester.name}
              className={`border-b-2 p-3 px-6 transition-all duration-300 ease-in-out ${
                semesters[selectedSemester]?.name === semester.name
                  ? "border-saseGreen text-black"
                  : "border-transparent text-black hover:border-gray-400"
              }`}
              onClick={() => setSelectedSemester(semesters.indexOf(semester))}
            >
              {semester.name}
            </button>
          ))}
        </div>
      )}

      <div ref={dropdownRef} className="absolute right-5 top-5 z-10">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex w-40 items-center justify-between rounded-xl border border-black bg-white px-2 py-2 font-redhat text-black"
        >
          <span>{view === "slides" ? "Slides" : "Recordings"}</span>
          <svg
            className="h-4 transition-transform duration-200"
            style={{ transform: isDropdownOpen ? "rotate(270deg)" : "rotate(90deg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          className={cn("absolute left-0 w-40 transform overflow-hidden rounded-xl border border-black bg-white transition-all duration-200", {
            "translate-y-0 opacity-100": isDropdownOpen,
            "-translate-y-2 opacity-0": !isDropdownOpen,
          })}
        >
          {view === "slides" ? (
            <div
              onClick={() => {
                setView("recordings");
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer p-2 font-redhat duration-300 ease-in-out hover:text-[1.05rem] hover:text-saseBlue"
            >
              Recordings
            </div>
          ) : (
            <div
              onClick={() => {
                setView("slides");
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer p-2 font-redhat duration-300 ease-in-out hover:text-[1.05rem] hover:text-saseBlue"
            >
              Slides
            </div>
          )}
        </div>
      </div>
      {view === "slides" ? (
        error ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg text-red-500">Failed to load slides. Please try again.</p>
          </div>
        ) : loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg">Loading presentation slides...</p>
          </div>
        ) : semesters.length > 0 ? (
          <div className="grid h-full w-full grid-cols-1 justify-items-center gap-6 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {semesters[selectedSemester]?.slides.map((deck, index) => (
              <div key={index} className="flex w-full flex-col items-center">
                {deck.thumbnail_url && <ImageButton imageUrl={deck.thumbnail_url} slideUrl={deck.embed_url} title={deck.name} />}
                {deck.name && <p className="mt-2 text-center text-sm">{deck.name}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg">No slides available.</p>
          </div>
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="font-redhat text-lg">Recordings coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default EventsSlides;

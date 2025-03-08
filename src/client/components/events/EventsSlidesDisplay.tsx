import { cn } from "@/shared/utils";
import React, { useEffect, useRef, useState } from "react";
import ImageButton from "./ImageButton";

const imageData = {
  "Fall 2023": [
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKBrvuah3ULJG6YbFtkQIHNdvnrupfCaVTR0mi",
      slideUrl: "https://docs.google.com/presentation/d/1A_syyc0EV7v2Nbasv8jquM20W0aM8aNa/embed?start=false&loop=false&delayms=3000",
      caption: "GBM 1: Into the SASE-Verse",
    },
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKhe5NTFG9SJMmEuRlABk3FjeDTi6ZgaqCo1G8",
      slideUrl: "https://docs.google.com/presentation/d/1A_syyc0EV7v2Nbasv8jquM20W0aM8aNa/embed?start=false&loop=false&delayms=3000",
      caption: "GBM 2: Sailing the Seven SASE",
    },
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKidrjzFZSynwPNl9jBc1Ktr2gWOdfUJku0ZGD",
      slideUrl: "https://docs.google.com/presentation/d/1A_syyc0EV7v2Nbasv8jquM20W0aM8aNa/embed?start=false&loop=false&delayms=3000",
      caption: "GBM 3: SASEatouille",
    },
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTK3XP8VibjaKwIicDGl8vTn5hBtmV0PXJLsH4e",
      slideUrl:
        "https://docs.google.com/presentation/d/e/2PACX-1vSJcZCq-AvyMTlY70mDxT9MnbCvQVfdbX_u0wSXh0DBLwfZ7uUGtRb7eq4SpQiaXAGvxmyeFyC-Gdj4/embed?start=false&loop=false&delayms=3000",
      caption: "GBM 4: The Last SASEbender",
    },
  ],
  // "Spring 2024": [
  //   // Placeholder links for now
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vRjesIK8GtogrTIETwI2GGKuWsokmx4dFqY_tNVi9R1Ri3Cu3ljHG4AaoTPzochbz8lWk0Ga0cIqQgU/embed?start=false&loop=false&delayms=3000",
  //   },
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vQUO65-H0ABBtwngsTFhCaQfT3-Hyqf2I3CUXM8E7ctM5YhdMuBNy3E2nV1cqnvldqhpzT6w0d2hxCu/embed?start=false&loop=false&delayms=3000",
  //   },
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vSw2sO-s1BSEBMPcpRjiUXGmfUQ79_MmQrIbdfhsbDmSdsSaw6kcdmwJyGZLSUC9uE3JWRQiv7w2cFe/embed?start=false&loop=false&delayms=3000",
  //   },
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vSJcZCq-AvyMTlY70mDxT9MnbCvQVfdbX_u0wSXh0DBLwfZ7uUGtRb7eq4SpQiaXAGvxmyeFyC-Gdj4/embed?start=false&loop=false&delayms=3000",
  //   },
  // ],
  // "Fall 2024": [
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vRjesIK8GtogrTIETwI2GGKuWsokmx4dFqY_tNVi9R1Ri3Cu3ljHG4AaoTPzochbz8lWk0Ga0cIqQgU/embed?start=false&loop=false&delayms=3000",
  //   },
  //   {
  //     slideUrl:
  //       "https://docs.google.com/p  resentation/d/e/2PACX-1vQUO65-H0ABBtwngsTFhCaQfT3-Hyqf2I3CUXM8E7ctM5YhdMuBNy3E2nV1cqnvldqhpzT6w0d2hxCu/embed?start=false&loop=false&delayms=3000",
  //   },
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vSw2sO-s1BSEBMPcpRjiUXGmfUQ79_MmQrIbdfhsbDmSdsSaw6kcdmwJyGZLSUC9uE3JWRQiv7w2cFe/embed?start=false&loop=false&delayms=3000",
  //   },
  //   {
  //     slideUrl:
  //       "https://docs.google.com/presentation/d/e/2PACX-1vSJcZCq-AvyMTlY70mDxT9MnbCvQVfdbX_u0wSXh0DBLwfZ7uUGtRb7eq4SpQiaXAGvxmyeFyC-Gdj4/embed?start=false&loop=false&delayms=3000",
  //   },
  // ],
};

const EventsSlides: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<keyof typeof imageData>("Fall 2023");
  const [view, setView] = useState<"slides" | "recordings">("slides");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex w-screen flex-col items-center gap-5 p-5">
      {/* Year Selector */}
      <div className="mb-6 flex w-full gap-4 border-b-2 border-gray-300 font-redhat">
        {Object.keys(imageData).map((year) => (
          <button
            key={year}
            className={cn("border-b-2 p-3 px-6 text-lg transition-all duration-300 ease-in-out", {
              "border-saseGreen text-black": selectedYear === year,
              "border-transparent text-black hover:border-gray-400": selectedYear !== year,
            })}
            onClick={() => setSelectedYear(year as keyof typeof imageData)}
          >
            {year}
          </button>
        ))}
      </div>

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

      {/* Slides Content */}
      {view === "slides" ? (
        <div className="grid h-full w-full grid-cols-1 justify-items-center gap-6 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {imageData[selectedYear].map((item, index) => (
            <div key={index} className="group flex w-full flex-col items-center">
              {item.imageUrl && <ImageButton imageUrl={item.imageUrl} slideUrl={item.slideUrl} title={item.caption} />}
              {item.caption && (
                <p className="mt-4 text-center font-redhat text-lg transition-transform duration-300 group-hover:scale-105">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="font-redhat text-lg">Recordings coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default EventsSlides;

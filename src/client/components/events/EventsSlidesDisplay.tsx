import React, { useState } from "react";
import ImageButton from "./ImageButton";

const imageData = {
  "Fall 2023": [
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKBrvuah3ULJG6YbFtkQIHNdvnrupfCaVTR0mi",
      slideUrl:
        "https://docs.google.com/presentation/d/e/2PACX-1vRjesIK8GtogrTIETwI2GGKuWsokmx4dFqY_tNVi9R1Ri3Cu3ljHG4AaoTPzochbz8lWk0Ga0cIqQgU/embed?start=false&loop=false&delayms=3000",
      caption: "GBM 1: Into the SASE-Verse",
    },
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKhe5NTFG9SJMmEuRlABk3FjeDTi6ZgaqCo1G8",
      slideUrl:
        "https://docs.google.com/presentation/d/e/2PACX-1vQUO65-H0ABBtwngsTFhCaQfT3-Hyqf2I3CUXM8E7ctM5YhdMuBNy3E2nV1cqnvldqhpzT6w0d2hxCu/embed?start=false&loop=false&delayms=3000",
      caption: "GBM 2: Sailing the Seven SASE",
    },
    {
      imageUrl: "https://moqsegbvdj.ufs.sh/f/2ipokchyMOTKidrjzFZSynwPNl9jBc1Ktr2gWOdfUJku0ZGD",
      slideUrl:
        "https://docs.google.com/presentation/d/e/2PACX-1vSw2sO-s1BSEBMPcpRjiUXGmfUQ79_MmQrIbdfhsbDmSdsSaw6kcdmwJyGZLSUC9uE3JWRQiv7w2cFe/embed?start=false&loop=false&delayms=3000",
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

  return (
    <div className="relative flex w-screen flex-col items-center gap-5 p-5">
      <div className="mb-6 flex w-full gap-4 border-b-2 border-gray-300">
        {Object.keys(imageData).map((year) => (
          <button
            key={year}
            className={`border-b-2 p-3 px-6 transition-all duration-300 ease-in-out ${
              selectedYear === year ? "border-saseGreen text-black" : "border-transparent text-black hover:border-gray-400"
            }`}
            onClick={() => setSelectedYear(year as keyof typeof imageData)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="absolute right-5 top-5">
        <select className="rounded border bg-white p-2 text-black" value={view} onChange={(e) => setView(e.target.value as "slides" | "recordings")}>
          <option value="slides">Slides</option>
          <option value="recordings">Recordings</option>
        </select>
      </div>

      {view === "slides" ? (
        <div className="grid h-full w-full grid-cols-1 justify-items-center gap-6 overflow-y-auto p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {imageData[selectedYear].map((item, index) => (
            <div key={index} className="flex w-full flex-col items-center">
              {item.imageUrl && <ImageButton imageUrl={item.imageUrl} slideUrl={item.slideUrl} />}
              {item.caption && <p className="mt-2 text-center text-sm">{item.caption}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-lg">Recordings coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default EventsSlides;

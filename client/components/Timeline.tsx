import React, { useEffect } from "react";

const Timeline = () => {
  useEffect(() => {
    const setEqualHeights = (el: NodeListOf<HTMLElement>) => {
      let maxHeight = 0;

      el.forEach((element: HTMLElement) => {
        const singleHeight = element.offsetHeight;
        if (maxHeight < singleHeight) {
          maxHeight = singleHeight;
        }
      });

      el.forEach((element: HTMLElement) => {
        element.style.height = `${maxHeight}px`;
      });
    };

    const elH = document.querySelectorAll<HTMLElement>(".timeline li > div");
    setEqualHeights(elH);
  }, []);

  return (
    <section className="timeline relative mx-auto grid max-w-full grid-cols-1 gap-5 px-2">
      <ol className="text-0 scroll-snap-type-x-mandatory scrollbar-thin scrollbar-thumb-white scrollbar-track-[#0668b3] overflow-x-scroll py-[250px] transition-all duration-1000">
        {[
          {
            year: "Jan 2011",
            content:
              "Silver Chapter 2010-11: Won National SASE Gold Chapter of the Year",
          },
          {
            year: "Jan 2012",
            content:
              "Silver Chapter 2011-12: Won National SASE Silver Chapter of the Year",
          },
          {
            year: "Jan 2014",
            content:
              "Hosted SASE Southeastern Regional Conference 2014: Connecting the Dots",
          },
          {
            year: "Jan 2015",
            content:
              "Hosted SASE Southeastern Regional Conference: Ignite, Innovate, Inspire",
          },
          {
            year: "Jan 2015",
            content:
              "Game Night Winner, NC 2015: UF SASE team “Chompions” wins Game Night at National Conference 2015",
          },
          {
            year: "Mar 2016",
            content:
              "Host of SASE Southeastern Regional Conference 2016: Beyond Expectations",
          },
          {
            year: "Jan 2019",
            content:
              "Inspire Awards 2018-2019: Most Philanthropic – Honorable Mention",
          },
          {
            year: "Jan 2020",
            content:
              "Inspire Awards 2019-20: Most Influential Chapter Honorable Mention",
          },
          {
            year: "Mar 2021",
            content:
              "Hosted SASE South Regional Conference 2021: Future in Focus",
          },
          {
            year: "Jan 2022",
            content:
              "Inspire Awards 2021-22 Collegiate Star Honorable Mention: Ian Lai (Social Chair ’21-’22, President ’22-’23)",
          },
          {
            year: "Jan 2022",
            content:
              "Award of Excellence 2021-22: Gator Engineering Student Society Recognition Award of Excellence",
          },
          {
            year: "Jun 2023",
            content: "SASE Inspire Awards 2022-2023: Most Improved Chapter",
          },
          {
            year: "Apr 2024",
            content:
              "UF Student Organization Awards 2023-24 Member of the Year: Sophia Dong (AASA Choreographer and SERC Programming Lead)",
          },
          {
            year: "Apr 2024",
            content:
              "UF Student Organization Awards 2023-24: Student Organization of the Year USSO",
          },
          {
            year: "May 2024",
            content:
              "Inspire Awards 2023-24 Collegiate Star: Emely Chhu (UF SASE President)",
          },
          {
            year: "May 2024",
            content: "Inspire Awards 2023-24: Strongest SASE Chapter",
          },
        ].map((item, index) => (
          <li
            key={index}
            className="scroll-snap-align-start relative inline-block h-[5px] w-[160px] list-none bg-black"
          >
            <div
              className={`absolute ${
                index % 2 === 0
                  ? "top-[-16px] -translate-y-full rounded-tl-[30px] border-[#0668b3]"
                  : "top-[calc(100%_+_16px)] border-[#7dc242]"
              } left-[calc(100%_+_7px)] w-[280px] whitespace-normal rounded-bl-[30px] rounded-br-[30px] bg-[var(--white)] p-[15px] text-base text-[var(--black)]`}
            >
              <time className="mb-2 block text-xl font-bold text-[#0668b3]">
                {item.year}
              </time>
              {item.content}
            </div>
          </li>
        ))}
        <li></li>
      </ol>
    </section>
  );
};

export default Timeline;

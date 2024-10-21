import React, { useEffect } from "react";
import "./styles/timeline.css"; // Adjust the path based on where your CSS file is located

const Timeline = () => {
  useEffect(() => {
    const setEqualHeights = (el: NodeListOf<HTMLElement>) => {
      let maxHeight = 0;

      el.forEach((element) => {
        const singleHeight = element.offsetHeight;
        if (maxHeight < singleHeight) {
          maxHeight = singleHeight;
        }
      });

      el.forEach((element) => {
        element.style.height = `${maxHeight}px`;
      });
    };

    const elH = document.querySelectorAll<HTMLElement>(".timeline li > div");
    setEqualHeights(elH);
  }, []);

  return (
    <>
      <section className="timeline mt-10">
        <ol>
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
                "Host of SASE Southeastern Regional Conference 2016: Beyond Expectations)",
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
            <li key={index}>
              <div>
                <time>{item.year}</time> {item.content}
              </div>
            </li>
          ))}
          <li></li>
        </ol>
      </section>
    </>
  );
};

export default Timeline;

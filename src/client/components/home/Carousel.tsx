import mentorship_icon from "@assets/MentorshipValueIcon.png";
import mentorship from "@assets/MentorshipValues.jpeg";
import prof from "@assets/ProfDevValue.jpg";
import prof_icon from "@assets/ProfDevValueIcon.png";
import service_icon from "@assets/ServiceIcon.png";
import service from "@assets/ServiceValue.jpg";
import socials_icon from "@assets/SocialsIcon.png";
import socials from "@assets/SocialsValue.jpg";
import sport from "@assets/SportsValue.jpg";
import sports_icon from "@assets/SportsValueIcon.png";
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselArrows";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = () => {
  const values = [
    {
      img: prof,
      icon: prof_icon,
      value: "Professional Development",
      text: "Through our meetings, conferences, and events, we shape skills that will help our members succeed in the professional world.",
    },
    {
      img: socials,
      icon: socials_icon,
      value: "Socials",
      text: "We host multiple social events throughout the year, including a semesterly banquet, that give our members a chance to bond.",
    },
    {
      img: service,
      icon: service_icon,
      value: "Service",
      text: "We believe that it is important to make meaningful contributions to the community, so we organize service events for our members to join.",
    },
    {
      img: sport,
      icon: sports_icon,
      value: "Sports",
      text: "To facilitate interaction, we have a year-round intramural sports program with 10+ different sports that members can participate in. No experience required!",
    },
    {
      img: mentorship,
      icon: mentorship_icon,
      value: "Mentorship",
      text: "To ensure each member has the personal and academic guidance they need, we organize a semesterly mentorship program. Keep an eye on our Instagram to apply!",
    },
  ];

  const [flipped, setFlipped] = useState([false, false, false, false, false]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<Array<HTMLElement>>([]);

  const {
    nextBtnDisabled,
    onNextButtonClick,
    onPrevButtonClick,
    prevBtnDisabled,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__image") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue =
            1.25 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  const handleImageClick = (index: number) => {
    const updatedFlippedStatus = [...flipped];
    updatedFlippedStatus[index] = !flipped[index];
    setFlipped(updatedFlippedStatus);
  };

  return (
    <div className="m-auto px-0 sm:px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {values.map((value, index) => (
            <div
              className="flex min-w-0 flex-[0_0_100%] items-center justify-center [transform:translate3d(0,0,0)] sm:flex-[0_0_40%]"
              key={index}
            >
              <div className="embla__slide__image rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
                <div
                  className="embla__slide__image relative rounded-2xl hover:cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={value.img}
                    alt={`${value.value} + Image`}
                    className="aspect-auto rounded-xl"
                  />
                  {!flipped[index] ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-saseGray/60">
                      <img src={value.icon} alt={`${value.value} + Icon`} />
                      <p className="text-center font-redhat text-4xl font-semibold text-black sm:text-5xl">
                        {value.value}
                      </p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-saseGray/60">
                      <p className="px-4 text-center font-redhat text-2xl font-medium text-black sm:text-3xl">
                        {value.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid justify-center">
        <div className="grid grid-cols-[1fr,1fr] items-center gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

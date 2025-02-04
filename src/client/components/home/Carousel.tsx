import { imageUrls } from "@assets/imageUrls";
import type { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselArrows";

const mentorship_icon = imageUrls["MentorshipIcon.png"];
const mentorship = imageUrls["MentorshipValues.jpeg"];
const prof = imageUrls["ProfDevValue.jpg"];
const prof_icon = imageUrls["ProfDevValueIcon.png"];
const service_icon = imageUrls["ServiceIcon.png"];
const service = imageUrls["ServiceValue.jpg"];
const socials_icon = imageUrls["SocialsIcon.png"];
const socials = imageUrls["SocialsValue.jpg"];
const sport = imageUrls["SportsValue.jpg"];
const sports_icon = imageUrls["SportsValueIcon.png"];

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

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
      text: "We have a year-round intramural sports program with 10+ different sports that members can participate in. No experience required!",
    },
    {
      img: mentorship,
      icon: mentorship_icon,
      value: "Mentorship",
      text: "To ensure each member has the personal and academic guidance they need, we organize a semesterly mentorship program. Keep an eye on our Instagram to apply!",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<Array<HTMLElement>>([]);

  const { nextBtnDisabled, onNextButtonClick, onPrevButtonClick, prevBtnDisabled } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__image") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
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

        const tweenValue = 1.25 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi.on("reInit", setTweenNodes).on("reInit", setTweenFactor).on("reInit", tweenScale).on("scroll", tweenScale).on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div className="m-auto px-0 sm:px-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {values.map((value, index) => (
            <div className="flex min-w-0 flex-[0_0_100%] items-center justify-center [transform:translate3d(0,0,0)] md:flex-[0_0_40%]" key={index}>
              <div className="embla__slide__image rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
                <div className="embla__slide__image group relative rounded-2xl hover:cursor-pointer">
                  <img src={value.img} alt={`${value.value} + Image`} className="aspect-auto rounded-xl" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-saseGray/60 hover:bg-saseGray/85">
                    <img src={value.icon} alt={`${value.value} + Icon`} className="mb-2 transition-opacity duration-300 group-hover:opacity-0" />{" "}
                    <p className="text-center font-redhat text-3xl font-semibold text-black transition-opacity duration-300 group-hover:opacity-0 md:text-2xl lg:text-3xl">
                      {value.value}
                    </p>
                    <p className="absolute bottom-[-20%] px-4 text-center font-redhat text-lg font-medium text-black opacity-0 transition-all duration-500 group-hover:bottom-1/2 group-hover:translate-y-1/2 group-hover:opacity-100 md:text-base lg:text-lg">
                      {value.text}
                    </p>
                  </div>
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

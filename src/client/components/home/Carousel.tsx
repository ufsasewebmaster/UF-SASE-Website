import image from "@assets/Values_ProfDev.png";
import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef } from "react";
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
      img: image,
      value: "Professional Development",
      text: "Through our meetings, conferences, and events, we shape skills that will help our members succeed in the professional world.",
    },
    {
      img: image,
      value: "Socials",
      text: "We host multiple social events throughout the year, including a semesterly banquet, that give our members a chance to bond.",
    },
    {
      img: image,
      value: "Service",
      text: "We believe that it is important to make meaningful contributions to the community, so we organize service events for our members to join.",
    },
    {
      img: image,
      value: "Sports",
      text: "To facilitate interaction, we have a year-round intramural sports program with 10+ different sports that members can participate in. No experience required!",
    },
    {
      img: image,
      value: "Mentorship",
      text: "To ensure each member has the personal and academic guidance they need, we organize a semesterly mentorship program. Keep an eye on our Instagram to apply!",
    },
  ];

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

  return (
    <div className="m-auto max-w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {values.map((value, index) => (
            <div
              className="flex min-w-0 flex-[0_0_50%] items-center justify-center [transform:translate3d(0,0,0)]"
              key={index}
            >
              <p
                className="absolute pt-[15%] font-redhat text-4xl font-semibold text-white"
                style={{ zIndex: 1 }}
              >
                {value.value}
              </p>
              <img
                className="embla__slide__image relative rounded-2xl border-4 border-saseGreen opacity-50 hover:cursor-pointer"
                src={value.img}
                alt={`Slide ${index + 1}`}
                style={{ zIndex: -1 }}
              />
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

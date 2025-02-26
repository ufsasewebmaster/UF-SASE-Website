import { cn } from "@/shared/utils";
import type { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useRef } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselArrows";
import ProgramImages from "./ProgramImages";
import Testimonials from "./Testimonials";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
  purpose: string;
  prog: string;
};

const TestimonialCarousel: React.FC<PropType> = ({ prog, purpose }) => {
  let slides;
  if (purpose == "Testimonials") {
    slides = Testimonials.find((t) => t.program === prog)?.testimonials ?? [];
  } else {
    slides = ProgramImages.find((i) => i.program === prog)?.images ?? [];
  }

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
    <div
      className={cn(
        {
          "flex items-center justify-center": purpose === "Testimonials",
        },
        `relative m-auto pb-8`,
      )}
    >
      {purpose === "Testimonials" ? (
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="absolute left-0 top-0 z-10 ml-[8%] h-full w-16 bg-gradient-to-r from-white to-transparent" />
        </>
      ) : null}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div className="flex min-w-0 flex-[0_0_100%] items-center justify-center [transform:translate3d(0,0,0)] md:flex-[0_0_50%]" key={index}>
              <div className="embla__slide__image rounded-2xl bg-gradient-to-r from-saseBlue via-[#7DC242] to-saseGreen p-[4px]">
                <div className="embla__slide__image group relative flex items-center justify-center hover:cursor-pointer">
                  {/* If slide element is not a string, carousel is for testimonials. If it is, carousel is for images */}
                  {typeof slide != "string" ? (
                    <img src={slide.image} alt={`Image`} className="aspect-auto rounded-xl" />
                  ) : (
                    <img src={slide} alt={`Image`} className="aspect-auto rounded-xl" />
                  )}
                  {typeof slide != "string" ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-end rounded-xl bg-saseGray/60 hover:bg-saseGray/90">
                      <p className="absolute pb-10 font-redhat text-xl font-semibold opacity-100 transition duration-300 group-hover:opacity-0">
                        {slide.name}
                      </p>
                      <p className="absolute pb-4 font-redhat text-lg opacity-100 transition duration-300 group-hover:opacity-0">{slide.position}</p>
                      <p className="flex h-0 w-full items-center justify-center overflow-hidden px-4 text-center font-redhat text-lg font-medium text-black opacity-0 transition-all duration-700 ease-in-out group-hover:h-full group-hover:translate-y-0 group-hover:opacity-100 md:text-sm lg:text-base">
                        "{slide.quote}"
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {purpose === "Testimonials" ? (
        <>
          <div className="absolute right-0 top-0 z-10 mr-[8%] h-full w-16 bg-gradient-to-l from-white to-transparent" />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      ) : (
        <div className="mt-4 grid justify-center">
          <div className="grid grid-cols-[1fr,1fr] items-center gap-2">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;

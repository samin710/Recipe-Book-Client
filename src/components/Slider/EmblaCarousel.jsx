import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { usePrevNextButtons } from "./EmblaCarouselArrowButtons";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const progressNode = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 2000 }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  return (
    <div className=" rounded-lg  md:space-y-5 space-y-4">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex -ml-4">
          {slides.map((imgUrl, index) => (
            <div className="flex-shrink-0 w-[80%] md:w-[45%] pl-4" key={index}>
              <img
                src={imgUrl}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl shadow shadow-primary flex gap-5 items-center justify-between p-2">
        <div className=" flex gap-4 text-primary rounded-2xl">
          <FiArrowLeft
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
            className="md:text-4xl text-3xl"
          />
          <FiArrowRight
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
            className="md:text-4xl text-3xl"
          />
        </div>
        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : " embla__progress--hidden"
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        <button
          className="btn btn-sm md:btn-lg btn-primary text-white px-6  rounded-xl"
          onClick={toggleAutoplay}
        >
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;

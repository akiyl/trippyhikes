"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Destination } from "@prisma/client";
import styles from "../styles/slider.module.css";
gsap.registerPlugin(SplitText);

type Props = {
  destinations: Destination[];
};

function createSlide(data: Destination) {
  const slide = document.createElement("div");
  slide.className = styles["slide"];

  const img = document.createElement("img");
  img.className = styles["slide-image"];
  img.src = data.imageSrc;
  img.alt = data.name;

  const title = document.createElement("div");
  title.className = styles["slide-title"];
  title.textContent = data.name;

  slide.appendChild(img);
  slide.appendChild(title);

  return slide;
}

export default function ScrollSlider({ destinations }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const frontSlideIndex = useRef(0);
  const isSlideAnimation = useRef(false);

  useEffect(() => {
    if (!destinations?.length) return;

    const container = containerRef.current!;
    const slider = sliderRef.current!;

    slider.innerHTML = "";

    // INITIAL SLIDES
    destinations.slice(0, 5).forEach((data) => {
      slider.appendChild(createSlide(data));
    });

    const slides = slider.querySelectorAll(`.${styles["slide"]}`);

    slides.forEach((slide: any) => {
      const title = slide.querySelector(`.${styles["slide-title"]}`);
      new SplitText(title, { type: "words", mask: "words" });
    });

    slides.forEach((slide: any, i: number) => {
      gsap.set(slide, {
        y: -15 + 15 * i + "%",
        z: 15 * i,
        opacity: 1,
      });
    });

    let wheelAccumulator = 0;
    const wheelThreshold = 100;
    let isWheelActive = false;

    const handleWheel = (event: WheelEvent) => {
      if (isSlideAnimation.current || isWheelActive) return;

      wheelAccumulator += Math.abs(event.deltaY);

      if (wheelAccumulator >= wheelThreshold) {
        isWheelActive = true;
        wheelAccumulator = 0;

        const direction = event.deltaY > 0 ? "down" : "up";

        handleSlideChange(direction);

        setTimeout(() => {
          isWheelActive = false;
        }, 1200);
      }
    };

    container.addEventListener("wheel", handleWheel);

    function handleSlideChange(direction = "down") {
      if (isSlideAnimation.current) return;

      isSlideAnimation.current = true;

      if (direction === "down") handleScrollDown();
      else handleScrollUp();
    }

    function handleScrollDown() {
      const slides = slider.querySelectorAll(`.${styles["slide"]}`);
      const firstSlide = slides[0];

      frontSlideIndex.current =
        (frontSlideIndex.current + 1) % destinations.length;

      const newBackIndex = (frontSlideIndex.current + 4) % destinations.length;

      const nextSlideData = destinations[newBackIndex];

      const newSlide = createSlide(nextSlideData);

      const newTitle = newSlide.querySelector(
        `.${styles["slide-title"]}`,
      ) as HTMLElement;

      const newSplit = new SplitText(newTitle, {
        type: "words",
        mask: "words",
      });

      gsap.set(newSplit.words, { yPercent: 100 });

      slider.appendChild(newSlide);

      gsap.set(newSlide, {
        y: -15 + 15 * 5 + "%",
        z: 15 * 5,
        opacity: 0,
      });

      const allSlides = slider.querySelectorAll(`.${styles["slide"]}`);

      allSlides.forEach((slide: any, i: number) => {
        const targetPosition = i - 1;

        gsap.to(slide, {
          y: -15 + 15 * targetPosition + "%",
          z: 15 * targetPosition,
          opacity: targetPosition < 0 ? 0 : 1,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            if (i === 0) {
              firstSlide.remove();
              isSlideAnimation.current = false;
            }
          },
        });
      });

      gsap.to(newSplit.words, {
        yPercent: 0,
        duration: 0.75,
        ease: "power4.inOut",
        stagger: 0.15,
        delay: 0.5,
      });
    }

    function handleScrollUp() {
      const slides = slider.querySelectorAll(`.${styles["slide"]}`);
      const lastSlide = slides[slides.length - 1];

      frontSlideIndex.current =
        (frontSlideIndex.current - 1 + destinations.length) %
        destinations.length;

      const newBackIndex =
        (frontSlideIndex.current - 1 + destinations.length) %
        destinations.length;

      const nextSlideData = destinations[newBackIndex];

      const newSlide = createSlide(nextSlideData);

      const newTitle = newSlide.querySelector(
        `.${styles["slide-title"]}`,
      ) as HTMLElement;

      const newSplit = new SplitText(newTitle, {
        type: "words",
        mask: "words",
      });

      gsap.set(newSplit.words, { yPercent: -100 });

      slider.insertBefore(newSlide, slider.firstChild);

      gsap.set(newSlide, {
        y: 0,
        z: -15,
        opacity: 0,
      });

      const allSlides = slider.querySelectorAll(`.${styles["slide"]}`);

      allSlides.forEach((slide: any, i: number) => {
        const targetPosition = i + 1;

        gsap.to(slide, {
          y: -15 + 15 * targetPosition + "%",
          z: 15 * targetPosition,
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            if (i === slides.length - 1) {
              lastSlide.remove();
              isSlideAnimation.current = false;
            }
          },
        });
      });

      gsap.to(newSplit.words, {
        yPercent: 0,
        duration: 0.75,
        ease: "power4.inOut",
        stagger: -0.15,
        delay: 0.5,
      });
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [destinations]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["slider"]} ref={sliderRef}></div>
    </div>
  );
}

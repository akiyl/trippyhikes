"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageLayout from "./explore";
import TrekSliderGSAP from "./trekSlider";

gsap.registerPlugin(ScrollTrigger);

export default function NewHome() {
  const words = ["EXPERIENCE", "TRAVEL", "EXPLORE"];
  const textEl = useRef<HTMLSpanElement | null>(null);
  const heroImage = useRef(null);
  const storySection = useRef(null);
  const horizontal = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    swapLoop();
  }, []);

  function swapLoop() {
    const oldWord = words[indexRef.current];
    indexRef.current = (indexRef.current + 1) % words.length;
    const newWord = words[indexRef.current];

    const el = textEl.current;
    if (!el) return;

    // Animate old word up & fade a bit
    gsap.to(el, {
      y: -60,
      opacity: 0,
      duration: 0.55,
      ease: "power3.in",
      onComplete: () => {
        // Set new word instantly (reset position at bottom)
        el.innerText = newWord;
        gsap.set(el, { y: 40, opacity: 0 });

        // Animate new word up into place
        gsap.to(el, {
          y: -15,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            // Loop with delay
            gsap.delayedCall(5, swapLoop);
          },
        });
      },
    });
  }

  useEffect(() => {
    // HERO ZOOM
    gsap.fromTo(
      heroImage.current,
      { scale: 1.4 },
      { scale: 1, duration: 3, ease: "power3.out" },
    );

    // TEXT REVEAL
    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
      });
    });

    // IMAGE REVEAL
    gsap.utils.toArray(".imageReveal").forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        scale: 1.3,
        opacity: 0,
        duration: 1.5,
      });
    });

    // PINNED STORY
    gsap.to(".storyText", {
      scrollTrigger: {
        trigger: storySection.current,
        start: "top top",
        end: "2000px",
        scrub: true,
        pin: true,
      },
      y: -200,
    });

    // HORIZONTAL SCROLL
    gsap.to(horizontal.current, {
      x: "-200%",
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontalSection",
        start: "top top",
        end: "2000px",
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <main className=" text-[#1a1a1a]">
      {/* HERO */}{" "}
      <div>
        <div className="absolute w-screen h-screen top-0 -z-10 opacity-45">
          <video
            autoPlay
            muted
            loop
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-title">
          <div className="flex flex-col h-screen  items-start  space-y-0 leading-30 ml-15   text-9xl font-neue mt-50 ">
            <div className="w-[900px] text-white">
              <div>
                <span>
                  <span className="swap-text" ref={textEl}>
                    {words[0]}
                  </span>
                </span>
              </div>
              <div className=" flex justify-center">THE</div>
              <div>HIMALAYAS</div>
            </div>
          </div>
        </div>
        {/* <div className="home-transition-overlay" aria-hidden="true"></div> */}
      </div>
      <ImageLayout />
      <div className="text-white h-[50vh] w-full px-20 mt-35 flex gap-8 flex-col">
        <h1 className="text-6xl">Why us?</h1>
        <h2 className="text-2xl tracking-wider">
          {" "}
          because it's not about the location it's the experience that
          matters{" "}
        </h2>
        <p className="text-xl leading-10 tracking-wider">
          {" "}
          We craft adventures that become unforgettable journeys along your
          memory lane. From snow-covered peaks to lush, vibrant valleys, we
          guide you every step of the way with care and expertise. Each
          experience is thoughtfully designed to connect you with nature,
          inspire a sense of wonder, and create lasting memories that stay with
          you long after the journey ends.
        </p>
      </div>
      <div>
        {" "}
        <TrekSliderGSAP />
      </div>
    </main>
  );
}

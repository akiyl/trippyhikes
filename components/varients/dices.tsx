"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Dices() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const subRef = useRef<HTMLDivElement | null>(null);

  const videoSrc = "/mnt/data/Screen Recording 2025-11-24 102242.mp4";

  useEffect(() => {
    if (!containerRef.current) return;

    (async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default || gsapModule;
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const squares: HTMLElement[] = imageRef.current
          ? Array.from(imageRef.current.querySelectorAll(".square"))
          : [];

        gsap.set(squares, () => ({
          scale: 0.3,
          opacity: 0,
          xPercent: gsap.utils.random(-120, 120),
          yPercent: gsap.utils.random(-120, 120),
        }));

        const lines = headlineRef.current?.querySelectorAll(".line") || [];
        const chars = headlineRef.current?.querySelectorAll(".char") || [];
        const subChars = subRef.current?.querySelectorAll(".char") || [];

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(squares, {
          scale: 1,
          opacity: 1,
          xPercent: 0,
          yPercent: 0,
          duration: 1.6,
          ease: "power4.out",
          stagger: 0.05,
        });

        tl.from(
          lines,
          {
            duration: 0.9,
            yPercent: 120,
            stagger: 0.15,
            clearProps: "transform",
          },
          "-=0.8"
        );

        tl.from(
          chars,
          {
            duration: 0.7,
            y: 12,
            opacity: 0,
            stagger: 0.02,
            ease: "back.out(1.5)",
          },
          "-=0.6"
        );

        tl.from(
          subChars,
          { duration: 0.7, y: 10, opacity: 0, stagger: 0.015 },
          "-=0.6"
        );

        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -160,
          scale: 1.04,
        });
      }, containerRef);

      return () => ctx.revert();
    })();
  }, []);

  function splitLines(text: string) {
    return text.split("\n").map((line, i) => (
      <div className="line overflow-hidden block" key={i}>
        <span className="inline-block">
          {line.split("").map((ch, idx) => (
            <span className="char inline-block" key={idx}>
              {ch}
            </span>
          ))}
        </span>
      </div>
    ));
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-neutral-900 flex items-center justify-center p-6"
    >
      <section className="max-w-6xl w-full grid grid-cols-12 gap-10 items-center">
        <div className="col-span-7">
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black grid grid-cols-5 grid-rows-3 h-[520px] gap-0"
          >
            {[...Array(15)].map((_, i) => (
              <div key={i} className="square relative overflow-hidden">
                <img
                  src="/your.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 text-white">
          <div className="mb-6 text-sm uppercase tracking-widest text-gray-400">
            Featured
          </div>

          <h1
            ref={headlineRef}
            className="text-5xl md:text-6xl font-extrabold leading-tight overflow-hidden"
          >
            {splitLines("When Image\nBecomes Squares")}
          </h1>

          <p
            ref={subRef}
            className="mt-6 text-lg text-gray-300 max-w-md overflow-hidden"
          >
            {
              "A merging grid effect where 15 squares fly inward from random directions to form a single video image, synced with smooth text reveal."
            }
          </p>

          <div className="mt-8">
            <a
              href="#"
              className="inline-block px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition"
            >
              View project
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .line {
          transform: translateY(0);
        }
        .char {
          display: inline-block;
          white-space: pre;
        }
      `}</style>
    </main>
  );
}

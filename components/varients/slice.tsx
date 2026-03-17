"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const slicesRef = useRef<HTMLDivElement[] | []>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const slices = slicesRef.current;
      const hasSlices = slices && slices.length > 0;

      if (hasSlices) {
        gsap.set(slices, { yPercent: 100, opacity: 0 });

        gsap.to(slices, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
        });
      } else if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
          }
        );
      }

      // subtle animated background (ken-burns / slow float)
      if (bgRef.current) {
        gsap.set(bgRef.current, { scale: 1 });
        gsap.to(bgRef.current, {
          scale: 1.06,
          rotation: 0.3,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // split-word animation for the heading
      if (containerRef.current) {
        const words =
          containerRef.current.querySelectorAll<HTMLElement>(".split-word");
        if (words && words.length > 0) {
          gsap.set(words, {
            y: 40,
            opacity: 0,
            transformOrigin: "left center",
          });
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.2,
          });
        }
      }

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -180,
          scale: 1.05,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full flex justify-center py-32 bg-black text-white"
    >
      {/* animated background */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-800 to-black opacity-90"
        aria-hidden
      />
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8 items-center">
        {/* IMAGE COLUMN */}
        <div className="col-span-7 relative w-full overflow-hidden">
          {/* 8 slices container */}
          <div
            ref={imageRef}
            className="relative w-full h-[500px] overflow-hidden"
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) slicesRef.current[i] = el;
                }}
                className="slice absolute top-0 left-0 w-full h-full overflow-hidden"
                style={{
                  clipPath: `inset(${(i * 12.5).toFixed(2)}% 0 ${(
                    100 -
                    (i + 1) * 12.5
                  ).toFixed(2)}% 0)`,
                }}
              >
                <img src="/your.jpg" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* TEXT COLUMN */}
        <div className="col-span-5">
          <h1 className="text-5xl font-bold mb-6">
            {["Stunning", "Slice", "Animation"].map((word, idx) => (
              <span
                key={idx}
                className="split-word inline-block mr-3 overflow-hidden"
                aria-hidden={false}
              >
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            This section includes a fully functional 8-slice GSAP reveal
            animation and parallax scroll effect.
          </p>
        </div>
      </div>
    </section>
  );
}

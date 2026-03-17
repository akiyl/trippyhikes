"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  imageSrc: string;
  className?: string;
  alt?: string;
};

export default function AnimatedBackground({
  imageSrc,
  className,
  alt = "background",
}: Props) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // slow ken-burns / float
      gsap.set(bgRef.current, { scale: 1 });
      gsap.to(bgRef.current, {
        scale: 1.06,
        rotation: 0.25,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // parallax scroll for inner image
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -120,
          scale: 1.03,
          ease: "none",
        });
      }
    }, bgRef);

    return () => ctx.revert();
  }, [imageSrc]);

  return (
    <div
      ref={bgRef}
      className={`w-full h-screen sm:h-[100vh] absolute top-0 bg-cover bg-center overflow-hidden -z-10 opacity-90 ${
        className ?? ""
      }`}
      aria-hidden
    >
      <img
        ref={imgRef}
        className="w-[100vw] h-full object-cover"
        src={imageSrc}
        alt={alt}
      />
    </div>
  );
}

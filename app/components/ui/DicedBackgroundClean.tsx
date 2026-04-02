"use client";
import React, { useEffect, useRef } from "react";
import { getGsap, getScrollTrigger } from "./gsapClient";

type Props = {
  imageSrc: string;
  cols?: number;
  rows?: number;
  className?: string;
};

export default function DicedBackgroundClean({
  imageSrc,
  cols = 5,
  rows = 3,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    (async () => {
      const [gsapRuntime, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);
      gsapRuntime.registerPlugin(ScrollTrigger);

      const ctx = gsapRuntime.context(() => {
        const squares: HTMLElement[] = Array.from(
          containerRef.current?.querySelectorAll(".dice-square") || [],
        );

        gsapRuntime.to(squares, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            toggleActions: "play none none none",
            once: true,
            immediateRender: false,
          },
        });

        gsapRuntime.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          y: -120,
          scale: 1.02,
        });

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    })();
  }, [cols, rows, imageSrc]);

  const total = cols * rows;

  const getTileOffset = (index: number) => {
    const seed = index + cols * 31 + rows * 17;
    const x = ((seed * 47) % 280) - 140;
    const y = ((seed * 89) % 280) - 140;
    return { x, y };
  };

  const containerClass =
    "absolute inset-0 w-full h-screen -z-10 overflow-hidden" +
    (className ? ` ${className}` : "");
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    width: "100%",
    height: "100%",
  };

  return (
    <div ref={containerRef} className={containerClass} aria-hidden>
      <div style={gridStyle}>
        {Array.from({ length: total }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const posX = cols > 1 ? (col / (cols - 1)) * 100 : 50;
          const posY = rows > 1 ? (row / (rows - 1)) * 100 : 50;
          const { x: offsetX, y: offsetY } = getTileOffset(i);

          const tileStyle: React.CSSProperties = {
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${cols * 100}% ${rows * 100}%`,
            backgroundPosition: `${posX}% ${posY}%`,
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            transform: `translate(${offsetX}px, ${offsetY}px) scale(0.3)`,
            opacity: 0,
            willChange: "transform, opacity",
          };

          return (
            <div
              key={i}
              className="dice-square relative overflow-hidden"
              style={tileStyle}
            />
          );
        })}
      </div>
    </div>
  );
}

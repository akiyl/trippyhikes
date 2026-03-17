"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  text: string;
  type?: "words" | "chars";
  className?: string;
  stagger?: number;
};

export default function SplitText({
  text,
  type = "words",
  className,
  stagger = 0.06,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".split-item")
    );

    gsap.set(items, { y: 24, opacity: 0, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, stagger, type]);

  const parts =
    type === "chars"
      ? text.split("").map((ch) => (ch === " " ? "\u00A0" : ch))
      : text.split(" ").filter(Boolean);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label={text}
      role="heading"
    >
      {parts.map((p, i) => (
        <span
          key={i}
          className="split-item inline-block mr-2 overflow-hidden"
          aria-hidden
        >
          <span className="inline-block">{p}</span>
        </span>
      ))}
    </div>
  );
}

"use client";
import React, { useEffect } from "react";
import { getGsap } from "./gsapClient";

type Props = {
  id: string;
  level?: 1 | 2 | 3 | 4;
};

export default function HeadingAnimator({ id, level = 1 }: Props) {
  useEffect(() => {
    const init = async () => {
      const gsap = await getGsap();

      const el = document.getElementById(id);
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const items = Array.from(el.querySelectorAll<HTMLElement>(".split-item"));
      if (!items.length) return;

      // different animations by heading level
      if (level === 1) {
        gsap.set(items, { y: 40, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
        });
      } else if (level === 2) {
        gsap.set(items, { x: -30, opacity: 0 });
        gsap.to(items, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power2.out",
        });
      } else {
        gsap.set(items, { scale: 0.9, opacity: 0 });
        gsap.to(items, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.03,
          ease: "back.out(1.2)",
        });
      }
    };

    init();
  }, [id, level]);

  return null;
}

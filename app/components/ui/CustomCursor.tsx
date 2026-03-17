"use client";
import React, { useEffect, useRef } from "react";
import { getGsap } from "./gsapClient";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = await getGsap();

      const dot = dotRef.current;
      if (!dot) return;

      gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0.9 });

      function move(e: MouseEvent) {
        gsap.to(dot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.18,
          ease: "power3.out",
        });
      }

      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    };

    init();
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 18,
        height: 18,
        borderRadius: "50%",
        pointerEvents: "none",
        background:
          "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 30%, rgba(0,0,0,0.1) 60%)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
      aria-hidden
    />
  );
}

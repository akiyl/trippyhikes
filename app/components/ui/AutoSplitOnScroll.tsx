"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AutoSplitOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const selector = "h1,h2,h3,p";
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    );

    elements.forEach((el) => {
      if (el.dataset.splitDone) return;
      // skip interactive or code elements
      if (el.closest("button, a, code, pre, [data-no-split]")) return;

      const text = el.textContent || "";
      if (!text.trim()) return;

      // split into words
      const words = text.split(/(\s+)/).filter(Boolean);

      // clear and build spans
      el.innerHTML = "";
      const wrapper = document.createElement("span");
      wrapper.className = "split-root inline-flex flex-wrap";

      words.forEach((w) => {
        const outer = document.createElement("span");
        outer.className = "split-item inline-block mr-2 overflow-hidden";
        const inner = document.createElement("span");
        inner.className = "inline-block";
        inner.textContent = w;
        outer.appendChild(inner);
        wrapper.appendChild(outer);
      });

      el.appendChild(wrapper);
      el.dataset.splitDone = "1";

      const items = Array.from(el.querySelectorAll<HTMLElement>(".split-item"));

      gsap.set(items, { y: 32, opacity: 0, willChange: "transform, opacity" });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

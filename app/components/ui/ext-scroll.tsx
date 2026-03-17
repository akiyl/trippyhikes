"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "../styles/ext.moudle.css";

gsap.registerPlugin(ScrollTrigger);

export default function SvgScrollPath() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(2, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const path = pathRef.current;
    if (!path) return; // guard against null

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = String(pathLength);
    path.style.strokeDashoffset = String(pathLength);

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 5,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="svg-path">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 394 958"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M288.477 42.8598C181.347 -34.0757 15.763 95.4907 20.0831 252.873C24.7797 423.971 335.325 207.964 347.557 378.448C360.189 554.496 16.967 370.578 20.0831 547.324C23.2857 728.976 410.564 838.777 371.19 664.239C362.093 623.914 355.137 599.127 332.365 568.975C252.318 462.988 73.9288 672.632 107.86 813.63C135.992 930.534 332.365 937.04 332.365 937.04"
          stroke="#FA8E0A"
          strokeWidth="100"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

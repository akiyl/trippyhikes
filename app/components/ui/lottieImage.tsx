"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import Lenis from "lenis";
import { getGsap, getScrollTrigger } from "./gsapClient";
import styles from "../styles/page.module.css";

export default function Home() {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const [gsap, ScrollTrigger] = await Promise.all([
        getGsap(),
        getScrollTrigger(),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis();

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      let scrollDirection = "down";
      let lastScrollY = 0;

      lenis.on("scroll", ({ scroll }: any) => {
        scrollDirection = scroll > lastScrollY ? "down" : "up";
        lastScrollY = scroll;
      });

      const heroImg = heroImgRef.current!;
      const lottieContainer = lottieRef.current!;

      const lottieAnimation = lottie.loadAnimation({
        container: lottieContainer,
        renderer: "svg",
        path: "/walk.json",
        autoplay: false,
      });

      const heroImgInitialWidth = heroImg.offsetWidth;
      const heroImgTargetWidth = 300;

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const heroImgCurrentWidth =
            heroImgInitialWidth -
            self.progress * (heroImgInitialWidth - heroImgTargetWidth);

          gsap.set(heroImg, { width: `${heroImgCurrentWidth}px` });

          const scrollDistance = self.scroll() - self.start;
          const pixelsPerFrame = 3;

          const frame =
            Math.floor(scrollDistance / pixelsPerFrame) %
            lottieAnimation.totalFrames;

          lottieAnimation.goToAndStop(frame, true);

          gsap.set(lottieContainer, {
            rotateY: scrollDirection === "up" ? -180 : 0,
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".about",
        start: "top 30%",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const lottieOffset = self.progress * window.innerHeight * 1.1;

          gsap.set(lottieContainer, {
            y: -lottieOffset,
            rotateY: scrollDirection === "up" ? -180 : 0,
          });
        },
      });
    };

    init();
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <a href="#">Trek with us</a>
      </nav>

      <section className={`hero ${styles.section}`} />

      <div className={styles.lottieContainer}>
        <div ref={lottieRef} className={styles.lottie}></div>

        <div ref={heroImgRef} className={styles.heroImg}>
          <video autoPlay muted loop playsInline preload="auto">
            <source src="/trektohim.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}

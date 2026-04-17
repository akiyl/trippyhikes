"use client";
import { useEffect, useState } from "react";
import HoverText from "./hover-text";
import Link from "next/link";
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-screen z-50 flex justify-between items-center px-10 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md text-white shadow-md"
          : "bg-transparent text-black"
      }`}
    >
      {/* Left Menu */}
      <div className="flex gap-6 uppercase text-sm tracking-wide">
        <HoverText primary="Explore" secondary="Explore" />
        <HoverText primary="Wildlife" secondary="Wildlife" />
        <HoverText primary="Experiences" secondary="Experiences" />
      </div>

      {/* Center Logo */}
      <div className="flex flex-col items-center leading-tight">
        <h1 className="text-3xl  font-light tracking-wide">
          TRAVEL TO HIMALAYAS
        </h1>
        <span className="text-xs tracking-[0.4em]">LUDRALA</span>
      </div>

      {/* Right Menu */}
      <div className="flex gap-6 uppercase text-sm tracking-wide">
        <Link href="/our-story">
          <HoverText primary="Our Story" secondary="Our Story" />
        </Link>
        <HoverText primary="The Lodge" secondary="The Lodge" />
        <HoverText primary="Contact" secondary="Contact" />
      </div>

      {/* Underline hover animation */}
      <style jsx>{`
        .nav-item {
          position: relative;
          cursor: pointer;
        }

        .nav-item::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 1px;
          background: black;
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;

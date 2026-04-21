"use client";
import { useEffect, useState } from "react";
import HoverText from "./hover-text";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md text-white shadow-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Desktop Left Menu */}
        <div className="hidden md:flex items-center gap-6 uppercase text-xs sm:text-sm tracking-wide">
          <Link href="/treks">
            <HoverText primary="Explore" secondary="Treks" />
          </Link>
          <HoverText primary="Experiences" secondary="Experiences" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex flex-col leading-tight items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
              TRAVEL TO HIMALAYAS
            </h1>
            <span className="text-sm md:text-md uppercase tracking-[0.35em] text-gray-200">
              LUDRALA
            </span>
          </Link>
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center gap-6 uppercase text-xs sm:text-sm tracking-wide">
          <Link href="/about">
            <HoverText primary="Our Story" secondary="About" />
          </Link>
          <Link
            href={`https://wa.me/6398901953?text=${encodeURIComponent(
              "Hello, I would like to get in touch with you.",
            )}`}
          >
            <HoverText primary="Contact" secondary="Contact" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:hidden focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-white/10 bg-black/95 px-4 py-4 transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col gap-4 text-sm uppercase tracking-wide text-gray-100">
          <Link href="/about" onClick={() => setMobileOpen(false)}>
            <HoverText primary="Our Story" secondary="About" />
          </Link>
          <Link href="/treks" onClick={() => setMobileOpen(false)}>
            <HoverText primary="Explore" secondary="Treks" />
          </Link>
          <Link
            href={`https://wa.me/6398901953?text=${encodeURIComponent(
              "Hello, I would like to get in touch with you.",
            )}`}
            onClick={() => setMobileOpen(false)}
          >
            <HoverText primary="Contact" secondary="Contact" />
          </Link>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-400">
            <span>Wildlife</span>
            <span>Experiences</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

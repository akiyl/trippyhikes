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

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md text-white shadow-xl"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center gap-6 uppercase text-xs sm:text-sm tracking-wide">
          <Link href="/treks">
            <HoverText primary="Explore" secondary="Treks" />
          </Link>

          {/* <HoverText primary="Wildlife" secondary="Wildlife" /> */}
          <HoverText primary="Experiences" secondary="Experiences" />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-tight items-center">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">
              TRAVEL TO HIMALAYAS
            </h1>
            <span className="text-md   uppercase tracking-[0.35em] text-gray-200">
              LUDRALA
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 uppercase text-xs sm:text-sm tracking-wide">
          <Link href="/about">
            <HoverText primary="Our Story" secondary="About" />
          </Link>
          <Link href="/treks">
            <HoverText primary="The lodge" secondary="Treks" />
          </Link>
          <Link
            href={`https://wa.me/${6398901953}?text=${encodeURIComponent(
              "Hello, I would like to get in touch with you.",
            )}`}
          >
            <HoverText primary="Contact" secondary="Contact" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="md:hidden border-t border-white/10 bg-black/95 px-4 py-4">
          <div className="flex flex-col gap-4 text-sm uppercase tracking-wide text-gray-100">
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              <HoverText primary="Our Story" secondary="Our Story" />
            </Link>
            <Link href="/treks" onClick={() => setMobileOpen(false)}>
              <HoverText primary="The Lodge" secondary="Treks" />
            </Link>
            <Link
              href={`https://wa.me/${6398901953}?text=${encodeURIComponent(
                "Hello, I would like to get in touch with you.",
              )}`}
              onClick={() => setMobileOpen(false)}
            >
              <HoverText primary="Contact" secondary="Contact" />
            </Link>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-400">
              <span>Explore</span>
              <span>Wildlife</span>
              <span>Experiences</span>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;

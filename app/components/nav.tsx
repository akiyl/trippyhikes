"use client";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md shadow-sm border-b border-white/30">
        <div className="flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <h1>
              <span className="text-blue-950">Travel</span>
              <span className="text-blue-500"> to</span>
              <span className="text-blue-500"> Himalayas</span>
            </h1>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex text-black-600 text-md font-semibold gap-10">
            {/* <Link
              className="hover:underline underline-offset-2 cursor-pointer transition duration-200"
              href="/discover"
            >
              Discover
            </Link> */}
            <Link
              href="/treks"
              className="hover:underline underline-offset-2 cursor-pointer transition duration-200"
            >
              {" "}
              Treks
            </Link>
            <Link
              href="/about"
              className="hover:underline underline-offset-2 cursor-pointer transition duration-200"
            >
              About
            </Link>
            <Link
              href={`https://wa.me/${6398901953}?text=${encodeURIComponent(
                "Hello, I would like to get in touch with you.",
              )}`}
              className="hover:underline underline-offset-2 cursor-pointer transition duration-200"
            >
              Contact Us
            </Link>
          </div>

          <Link
            href="/signin"
            className="
                relative overflow-hidden px-6 py-2
                rounded-full border border-white/20 backdrop-blur-md
                bg-blue-950 text-white font-medium
                transition-all duration-300 ease-in-out
                hover:bg-blue-900 hover:scale-105 hover:shadow-lg
              "
          >
            <span className="relative z-10">Sign In</span>

            <span
              className="
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                  translate-x-[-100%] animate-[shine_2s_infinite]
                "
            />
          </Link>

          {/* Hamburger Menu Icon */}
          <div
            className="md:hidden text-3xl text-gray-900 cursor-pointer z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </div>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/90 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col px-6 py-20 space-y-6 text-gray-800 text-lg">
          {[
            { label: "Discover", href: "/discover" },
            { label: "Treks", href: "/treks" },
            {
              label: "Contact Us",
              href: `https://wa.me/${9528277247}?text=${encodeURIComponent(
                "Hello, I would like to get in touch with you.",
              )}`,
            },
            { label: "About", href: "/about" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-blue-500 cursor-pointer transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/signin"
            className="mt-4 bg-blue-950 text-white text-center py-2 rounded-3xl hover:bg-blue-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Dim background when mobile nav is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;

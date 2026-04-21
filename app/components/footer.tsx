// components/Footer.tsx

import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:grid md:grid-cols-4 gap-8">
        {/* Logo & Main Links */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Travel to <span className="text-white">Himalayas</span>
          </h2>
        </div>

        {/* Available Countries */}
        <div className="text-center md:text-left">
          <h3 className="text-md font-semibold mb-4">Available states</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              "Uttarakhand",
              "Himachal Pradesh",
              "Sikkim",
              "Jammu & Kashmir",
              "Arunachal Pradesh",
              "Ladakh",
            ].map((country) => (
              <li key={country}>
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-200 ease-in-out"
                >
                  {country}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/treks"
                className="text-blue-400 hover:underline transition duration-200 ease-in-out"
              >
                More Treks +
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="text-center md:text-left">
          <h3 className="text-md font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { label: "About", href: "/about" },

              { label: "Trips", href: "/treks" },
              { label: "Reviews", href: "/reviews" },
              { label: "Gallery", href: "/discover" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-blue-400 transition duration-200 ease-in-out"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div className="text-center md:text-left">
          <h3 className="text-md font-semibold mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["Privacy", "Cookies", "Terms of use", "Terms & Conditions"].map(
              (policy) => (
                <li key={policy}>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition duration-200 ease-in-out"
                  >
                    {policy}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © 2026 Travel to Himalayas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

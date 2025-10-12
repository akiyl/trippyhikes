// components/Footer.tsx

import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 w-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Main Links */}
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            goexplore<span className="text-white">.</span>
          </h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {["About", "Features", "About us", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-blue-400 transition duration-200 ease-in-out"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Available Countries */}
        <div>
          <h3 className="text-md font-semibold mb-4">Available Countries</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              "Australia",
              "Bangladesh",
              "Canada",
              "Denmark",
              "Finland",
              "England",
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
                href="#"
                className="text-blue-400 hover:underline transition duration-200 ease-in-out"
              >
                More Countries +
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-md font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["About", "Contact", "Trips", "Reviews", "Resources"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition duration-200 ease-in-out"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Policies */}
        <div>
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
              )
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

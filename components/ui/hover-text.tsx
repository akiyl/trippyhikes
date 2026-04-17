"use client";
import { motion } from "framer-motion";

type Props = {
  primary: string;
  secondary: string;
};

const container = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letter = {
  rest: { y: 0, opacity: 1 },
  hover: { y: -20, opacity: 0 },
};

const letterSecondary = {
  rest: { y: 20, opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

export default function HoverTextLetters({ primary, secondary }: Props) {
  return (
    <motion.div
      className="relative overflow-hidden h-6 cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Primary text */}
      <motion.div className="flex absolute" variants={container}>
        {primary.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Secondary text */}
      <motion.div className="flex absolute" variants={container}>
        {secondary.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letterSecondary}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Invisible text to keep height */}
      <div className="opacity-0">{primary}</div>
    </motion.div>
  );
}

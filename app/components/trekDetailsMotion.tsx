// components/TrekDetailMotion.tsx
"use client";

import { motion } from "framer-motion";

export default function TrekDetailMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {children}
    </motion.div>
  );
}

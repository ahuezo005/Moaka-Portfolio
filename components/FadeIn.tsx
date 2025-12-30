"use client"; // <--- tells Next.js "Let the browser handle this"

import { motion } from "framer-motion";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start invisible and 20px lower
      animate={{ opacity: 1, y: 0 }}  // End visible and at original position
      transition={{ duration: 0.8, ease: "easeOut" }} // Take 0.8 seconds
    >
      {children}
    </motion.div>
  );
}
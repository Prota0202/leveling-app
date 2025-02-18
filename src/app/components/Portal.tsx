"use client";

import { motion } from "framer-motion";

export default function Portal() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      className="w-64 h-64 bg-portal-gradient rounded-full flex items-center justify-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="w-48 h-48 border-4 border-primary rounded-full"
      />
    </motion.div>
  );
}
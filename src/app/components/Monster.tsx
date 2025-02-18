"use client";

import { motion } from "framer-motion";

interface MonsterProps {
  name: string;
  health: number;
  strength: number;
  image: string;
}

export default function Monster({ name, health, strength, image }: MonsterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-dark rounded-lg shadow-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="font-title text-xl text-primary">{name}</h3>
      <p className="text-sm text-light">Santé : {health}</p>
      <p className="text-sm text-light">Force : {strength}</p>
    </motion.div>
  );
}
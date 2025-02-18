"use client";

import { useUser } from "@/app/context/UserContext";
import { motion } from "framer-motion";

export default function Rewards() {
  const { user } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Récompenses</h2>
      <div className="space-y-2">
        {user.rewards.length > 0 ? (
          user.rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <span className="text-yellow-400">🎉</span>
              <p className="text-sm">{reward}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-gray-300">Aucune récompense pour le moment.</p>
        )}
      </div>
    </motion.div>
  );
}
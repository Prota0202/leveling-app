"use client";

import { useUser } from "@/app/context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Quest() {
  const { user, completeQuest } = useUser();

  return (
    <div className="p-4 bg-dark rounded-lg shadow-lg">
      <h2 className="text-xl font-title text-primary mb-4">Quêtes</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {user.quests.map((quest) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gray-800 rounded-lg"
            >
              <h3 className="font-semibold text-light">{quest.title}</h3>
              <p className="text-sm text-gray-300">{quest.description}</p>
              <p className="text-sm text-gray-300">
                Récompense : {quest.reward.gold} or, {quest.reward.crystals} cristaux
              </p>
              <button
                onClick={() => completeQuest(quest.id)}
                disabled={quest.completed}
                className={`mt-2 px-4 py-2 rounded flex items-center space-x-2 ${
                  quest.completed
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-primary hover:bg-secondary"
                }`}
              >
                {quest.completed ? (
                  <>
                    <FaCheckCircle className="text-light" />
                    <span className="text-light">Complétée</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-light" />
                    <span className="text-light">Compléter</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
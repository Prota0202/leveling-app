"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useUser } from "@/app/context/UserContext";

export default function QuestPopup() {
  const { user, acceptQuest, refuseQuest } = useUser();

  if (!user.activeQuest) return null; // Ne rien afficher si aucune quête active

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="bg-dark p-6 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-xl font-title text-primary mb-4">{user.activeQuest.title}</h2>
          <p className="text-sm text-gray-300 mb-4">{user.activeQuest.description}</p>
          <div className="flex space-x-4">
            <button
              onClick={acceptQuest}
              className="flex-1 px-4 py-2 bg-primary hover:bg-secondary rounded flex items-center justify-center space-x-2"
            >
              <FaCheckCircle className="text-light" />
              <span className="text-light">Accepter</span>
            </button>
            <button
              onClick={refuseQuest}
              className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded flex items-center justify-center space-x-2"
            >
              <FaTimesCircle className="text-light" />
              <span className="text-light">Refuser</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
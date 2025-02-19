"use client";

import { useUser } from "@/app/context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Quest() {
  const { user, completeQuest } = useUser();

  return (
    <div className="p-6 bg-dark rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-title text-primary mb-6">Quêtes</h2>

      {user.quests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Vous n'avez pas de quête pour le moment.</p>
          <p className="text-sm text-gray-500 mt-2">
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {user.quests.map((quest) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-light">{quest.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{quest.description}</p>

                <div className="mt-4">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(quest.progress / quest.goal) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    Progression : {quest.progress}/{quest.goal} 
                    {quest.goalType === 'steps' ? ' pas' : ' km'}
                  </p>
                </div>

                <button
                  onClick={() => completeQuest(quest.id)}
                  disabled={quest.completed}
                  className={`w-full mt-4 py-2 rounded flex items-center justify-center gap-2 ${
                    quest.completed
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-primary hover:bg-secondary"
                  }`}
                >
                  <FaCheckCircle />
                  {quest.completed ? 'Quête terminée' : 'Valider la progression'}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

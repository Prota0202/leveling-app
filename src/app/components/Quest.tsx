"use client";

import { useUser } from "@/app/context/UserContext";
import { useState } from "react";
import { FaPlusCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import des icônes

// Définition du type d'une quête
interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

// Liste des quêtes disponibles
const questTemplates = [
  {
    title: "Faire {{count}} pompes",
    description: "Complète {{count}} pompes pour gagner de l'XP.",
    xpReward: 50,
  },
  {
    title: "Lire {{count}} chapitre(s) de livre",
    description: "Lis {{count}} chapitre(s) de ton livre préféré.",
    xpReward: 30,
  },
  {
    title: "Marcher {{count}} minutes",
    description: "Fais une promenade de {{count}} minutes.",
    xpReward: 40,
  },
];

// Générer une quête aléatoire
const generateQuest = (): Quest => {
  const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];
  const count = Math.floor(Math.random() * 10) + 1; // Nombre aléatoire entre 1 et 10
  const title = template.title.replace("{{count}}", count.toString());
  const description = template.description.replace("{{count}}", count.toString());

  return {
    id: Math.random(),
    title,
    description,
    xpReward: template.xpReward * count,
    completed: false,
  };
};

export default function Quest() {
  const { gainXP, showNotification } = useUser();
  const [quests, setQuests] = useState<Quest[]>([]);

  // Ajouter une nouvelle quête
  const addQuest = () => {
    setQuests((prevQuests) => [...prevQuests, generateQuest()]);
  };

  // Compléter une quête
  const completeQuest = (quest: Quest) => {
    if (!quest.completed) {
      gainXP(quest.xpReward);
      showNotification(`Quête "${quest.title}" complétée !`);
      quest.completed = true;
      setQuests((prevQuests) => [...prevQuests]);
    }
  };

  return (
    <div className="p-4 bg-dark rounded-lg shadow-lg">
      <h2 className="text-xl font-title text-primary mb-4">Quêtes</h2>
      <button
        onClick={addQuest}
        className="mb-4 px-4 py-2 bg-primary hover:bg-secondary rounded flex items-center space-x-2"
      >
        <FaPlusCircle className="text-light" />
        <span className="text-light">Générer une nouvelle quête</span>
      </button>
      <div className="space-y-4">
        {quests.map((quest) => (
          <div key={quest.id} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-light">{quest.title}</h3>
            <p className="text-sm text-gray-300">{quest.description}</p>
            <p className="text-sm text-gray-300">Récompense : {quest.xpReward} XP</p>
            <button
              onClick={() => completeQuest(quest)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
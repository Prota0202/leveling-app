"use client"; // Ce composant utilise des hooks React, donc il doit être côté client

import { useUser } from "C:\\Users\\AbdelBadi\\leveling-app\\src\\app\\context\\UserContext";

// Définition du type d'une quête
interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

// Liste des quêtes disponibles
const quests: Quest[] = [
  {
    id: 1,
    title: "Faire 10 pompes",
    description: "Complète 10 pompes pour gagner de l'XP.",
    xpReward: 50,
    completed: false,
  },
  {
    id: 2,
    title: "Lire un chapitre de livre",
    description: "Lis un chapitre de ton livre préféré.",
    xpReward: 30,
    completed: false,
  },
  {
    id: 3,
    title: "Marcher 30 minutes",
    description: "Fais une promenade de 30 minutes.",
    xpReward: 40,
    completed: false,
  },
];

export default function Quest() {
  const { user, setUser } = useUser();

  // Fonction pour compléter une quête
  const completeQuest = (quest: Quest) => {
    if (!quest.completed) {
      // Ajoute l'XP de la quête au joueur
      setUser({
        ...user,
        xp: user.xp + quest.xpReward,
      });

      // Marque la quête comme complétée
      quest.completed = true;
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Quêtes</h2>
      <div className="space-y-4">
        {quests.map((quest) => (
          <div key={quest.id} className="p-4 bg-gray-700 rounded-lg">
            <h3 className="font-semibold">{quest.title}</h3>
            <p className="text-sm text-gray-300">{quest.description}</p>
            <p className="text-sm text-gray-300">Récompense : {quest.xpReward} XP</p>
            <button
              onClick={() => completeQuest(quest)}
              disabled={quest.completed}
              className={`mt-2 px-4 py-2 rounded ${
                quest.completed
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {quest.completed ? "Complétée" : "Compléter"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
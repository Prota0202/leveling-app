"use client";

import { useUser } from "@/app/context/UserContext";

export default function Leaderboard() {
  const { user } = useUser();

  // Exemple de classement (à remplacer par des données dynamiques)
  const leaderboard = [
    { name: "Joueur 1", level: 10 },
    { name: "Joueur 2", level: 8 },
    { name: "Joueur 3", level: 7 },
    { name: user.name || "Toi", level: user.level }, // Ajoute le joueur actuel
  ];

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Classement</h2>
      <div className="space-y-2">
        {leaderboard
          .sort((a, b) => b.level - a.level) // Trie par niveau décroissant
          .map((player, index) => (
            <div key={index} className="flex justify-between">
              <p>
                {index + 1}. {player.name}
              </p>
              <p>Niveau {player.level}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
"use client";

import { useUser } from "@/app/context/UserContext";

export default function Leaderboard() {
  const { user } = useUser();

  const leaderboard = [
    { name: "Joueur1", level: 10 },
    { name: "Joueur2", level: 8 },
    { name: user.name || "Toi", level: user.level },
  ];

  return (
    <div className="p-6 bg-dark rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-title text-primary mb-6">Classement</h2>
      <div className="space-y-3">
        {leaderboard
          .sort((a, b) => b.level - a.level)
          .map((player, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
            >
              <p className="text-light">
                {index + 1}. {player.name}
              </p>
              <p className="text-sm text-gray-300">Niveau {player.level}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
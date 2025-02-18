"use client"; // Ce composant utilise des hooks React, donc il doit être côté client

import { useUser } from "C:\\Users\\AbdelBadi\\leveling-app\\src\\app\\context\\UserContext";

export default function Stats() {
  const { user } = useUser();

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Statistiques</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Niveau :</span> {user.level}
        </p>
        <p>
          <span className="font-semibold">XP :</span> {user.xp}
        </p>
        <p>
          <span className="font-semibold">Force :</span> {user.stats.strength}
        </p>
        <p>
          <span className="font-semibold">Intelligence :</span> {user.stats.intelligence}
        </p>
        <p>
          <span className="font-semibold">Endurance :</span> {user.stats.endurance}
        </p>
      </div>
    </div>
  );
}
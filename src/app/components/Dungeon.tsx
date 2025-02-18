"use client";

import { useUser } from "@/app/context/UserContext";
import { useState } from "react";
import { motion } from "framer-motion";

// Définition du type d'un donjon
interface Dungeon {
  id: number;
  name: string;
  difficulty: string;
  monsters: number;
  rewardXP: number;
}

// Liste des donjons disponibles
const dungeons: Dungeon[] = [
  {
    id: 1,
    name: "Donjon des Gobelins",
    difficulty: "Facile",
    monsters: 10,
    rewardXP: 100,
  },
  {
    id: 2,
    name: "Donjon des Orcs",
    difficulty: "Moyen",
    monsters: 20,
    rewardXP: 200,
  },
  {
    id: 3,
    name: "Donjon du Dragon",
    difficulty: "Difficile",
    monsters: 30,
    rewardXP: 500,
  },
];

export default function Dungeon() {
  const { gainXP, showNotification } = useUser();
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // Commencer un donjon
  const startDungeon = (dungeon: Dungeon) => {
    setSelectedDungeon(dungeon);
    setBattleLog([`Donjon "${dungeon.name}" commencé !`]);
  };

  // Combattre les monstres
  const fightMonsters = () => {
    if (!selectedDungeon) return;

    // Le joueur combat les monstres
    const monstersDefeated = Math.floor(Math.random() * selectedDungeon.monsters) + 1;
    const xpEarned = (selectedDungeon.rewardXP / selectedDungeon.monsters) * monstersDefeated;

    gainXP(xpEarned);
    showNotification(`Tu as vaincu ${monstersDefeated} monstres et gagné ${xpEarned} XP !`);
    setSelectedDungeon(null);
  };

  return (
    <div className="p-4 bg-dark rounded-lg shadow-lg">
      <h2 className="text-xl font-title text-primary mb-4">Donjons</h2>
      <div className="space-y-4">
        {!selectedDungeon ? (
          <>
            <p>Choisis un donjon à explorer :</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dungeons.map((dungeon) => (
                <motion.div
                  key={dungeon.id}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => startDungeon(dungeon)}
                >
                  <h3 className="font-semibold text-light">{dungeon.name}</h3>
                  <p className="text-sm text-gray-300">Difficulté : {dungeon.difficulty}</p>
                  <p className="text-sm text-gray-300">Monstres : {dungeon.monsters}</p>
                  <p className="text-sm text-gray-300">Récompense : {dungeon.rewardXP} XP</p>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p>Donjon en cours : {selectedDungeon.name}</p>
            <div className="space-y-2">
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm text-light">
                  {log}
                </p>
              ))}
            </div>
            <button
              onClick={fightMonsters}
              className="mt-4 px-4 py-2 bg-primary hover:bg-secondary rounded"
            >
              Combattre les monstres
            </button>
          </>
        )}
      </div>
    </div>
  );
}
"use client";

import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

// Définition du type d'un ennemi
interface Enemy {
  id: number;
  name: string;
  health: number;
  strength: number;
  rewardXP: number;
  image: string; // URL de l'image de l'ennemi
}

// Liste des ennemis disponibles
const enemies: Enemy[] = [
  {
    id: 1,
    name: "Gobelin",
    health: 50,
    strength: 10,
    rewardXP: 20,
    image: "/images/goblin.png", // Chemin vers l'image
  },
  {
    id: 2,
    name: "Orc",
    health: 100,
    strength: 20,
    rewardXP: 40,
    image: "/images/orc.png", // Chemin vers l'image
  },
  {
    id: 3,
    name: "Dragon",
    health: 200,
    strength: 40,
    rewardXP: 100,
    image: "/images/dragon.png", // Chemin vers l'image
  },
];

export default function Battle() {
  const { user, gainXP, showNotification } = useUser();
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // Commencer un combat contre un ennemi
  const startBattle = (enemy: Enemy) => {
    setCurrentEnemy(enemy);
    setBattleLog([`Combat contre ${enemy.name} commencé !`]);
  };

  // Attaquer l'ennemi
  const attackEnemy = () => {
    if (!currentEnemy) return;

    // Le joueur attaque l'ennemi
    const playerDamage = user.stats.strength;
    currentEnemy.health -= playerDamage;
    setBattleLog((prevLog) => [
      ...prevLog,
      `Tu as infligé ${playerDamage} dégâts à ${currentEnemy.name} !`,
    ]);

    // Vérifie si l'ennemi est vaincu
    if (currentEnemy.health <= 0) {
      gainXP(currentEnemy.rewardXP);
      showNotification(`Victoire ! Tu as gagné ${currentEnemy.rewardXP} XP.`);
      setCurrentEnemy(null);
      return;
    }

    // L'ennemi attaque le joueur
    const enemyDamage = currentEnemy.strength;
    setBattleLog((prevLog) => [
      ...prevLog,
      `${currentEnemy.name} t'a infligé ${enemyDamage} dégâts !`,
    ]);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Combat</h2>
      <div className="space-y-4">
        {!currentEnemy ? (
          <>
            <p>Choisis un ennemi à affronter :</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {enemies.map((enemy) => (
                <button
                  key={enemy.id}
                  onClick={() => startBattle(enemy)}
                  className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <img
                    src={enemy.image}
                    alt={enemy.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{enemy.name}</h3>
                  <p className="text-sm text-gray-300">Santé : {enemy.health}</p>
                  <p className="text-sm text-gray-300">Force : {enemy.strength}</p>
                  <p className="text-sm text-gray-300">Récompense : {enemy.rewardXP} XP</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p>Combat en cours contre {currentEnemy.name} :</p>
            <div className="space-y-2">
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm">
                  {log}
                </p>
              ))}
            </div>
            <button
              onClick={attackEnemy}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
            >
              Attaquer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
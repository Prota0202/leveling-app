"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Définition du type des données du joueur
interface UserData {
  level: number;
  xp: number;
  stats: {
    strength: number;
    intelligence: number;
    endurance: number;
  };
  rewards: string[]; // Récompenses du joueur
}

// Valeurs par défaut du joueur
const defaultUserData: UserData = {
  level: 1,
  xp: 0,
  stats: {
    strength: 5,
    intelligence: 5,
    endurance: 5,
  },
  rewards: [],
};

// Création du contexte
const UserContext = createContext<{
  user: UserData;
  setUser: (user: UserData) => void;
  gainXP: (amount: number) => void;
} | undefined>(undefined);

// Provider du contexte
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(defaultUserData);

  // Fonction pour gagner de l'XP et gérer la montée de niveau
  const gainXP = (amount: number) => {
    setUser((prevUser) => {
      let newXP = prevUser.xp + amount;
      let newLevel = prevUser.level;
      let newRewards = [...prevUser.rewards];

      // Monte de niveau tous les 100 XP
      if (newXP >= 100) {
        const levelsGained = Math.floor(newXP / 100);
        newLevel += levelsGained;
        newXP %= 100;

        // Ajoute une récompense pour chaque niveau gagné
        for (let i = 0; i < levelsGained; i++) {
          newRewards.push(`Récompense niveau ${newLevel - i}`);
        }
      }

      return {
        ...prevUser,
        level: newLevel,
        xp: newXP,
        rewards: newRewards,
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, gainXP }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pour utiliser le contexte facilement
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
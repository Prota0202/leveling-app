"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Définition du type des données du joueur
interface UserData {
  name: string; // Nom d'utilisateur
  level: number;
  xp: number;
  class: string; // Classe du joueur
  stats: {
    strength: number;
    intelligence: number;
    endurance: number;
  };
  rewards: string[]; // Récompenses du joueur
}

// Valeurs par défaut du joueur
const defaultUserData: UserData = {
  name: "", // Nom vide par défaut
  level: 1,
  xp: 0,
  class: "Guerrier", // Classe par défaut
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
  updateName: (name: string) => void;
  changeClass: (newClass: string) => void;
} | undefined>(undefined);

// Provider du contexte
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(defaultUserData);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setUser(JSON.parse(savedData));
    }
  }, []);

  // Sauvegarder les données dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  // Fonction pour gagner de l'XP et gérer la montée de niveau
  const gainXP = (amount: number) => {
    setUser((prevUser) => {
      let newXP = prevUser.xp + amount;
      let newLevel = prevUser.level;
      const newRewards = [...prevUser.rewards];

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

  // Fonction pour mettre à jour le nom d'utilisateur
  const updateName = (name: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      name,
    }));
  };

  // Fonction pour changer de classe
  const changeClass = (newClass: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      class: newClass,
      stats: {
        strength: newClass === "Guerrier" ? 15 : 10,
        intelligence: newClass === "Mage" ? 15 : 5,
        endurance: newClass === "Assassin" ? 15 : 8,
      },
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, gainXP, updateName, changeClass }}>
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

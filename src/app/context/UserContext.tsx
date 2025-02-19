"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
  name: string;
  level: number;
  xp: number;
  class: string;
  stats: {
    strength: number;
    intelligence: number;
    endurance: number;
    rank: string;
    height: number;
    weight: number;
    bmi: number;
  };
  rewards: string[];
  quests: Quest[];
  gold: number;
  crystals: number;
  activeQuest: Quest | null;
  physicalActivity: {
    steps: number;
    distance: number;
    calories: number;
    timeSpent: number;
  };

}

interface Quest {
  id: number;
  title: string;
  description: string;
  type: "physical" | "combat" | "social" | "story";
  goal: number;
  reward: {
    gold: number;
    crystals: number;
    items?: string[];
  };
  cooldown: number;
  completed: boolean;
}

// Valeurs par défaut du joueur
const defaultUserData: UserData = {
  name: "",
  level: 1,
  xp: 0,
  class: "Guerrier",
  stats: {
    strength: 5,
    intelligence: 5,
    endurance: 5,
  },
  rewards: [],
  quests: [],
  gold: 0,
  crystals: 0,
  activeQuest: null,

  physicalActivity: {
    steps: 0,
    distance: 0,
    calories: 0,
    timeSpent: 0
  }
};

// Création du contexte
const UserContext = createContext<{
  user: UserData;
  setUser: (user: UserData) => void;
  gainXP: (amount: number) => void;
  updateName: (name: string) => void;
  changeClass: (newClass: string) => void;
  addQuest: (quest: Quest) => void;
  completeQuest: (questId: number) => void;
  addGold: (amount: number) => void;
  addCrystals: (amount: number) => void;
  acceptQuest: () => void;
  refuseQuest: () => void;
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

  // Fonction pour ajouter une quête
  const addQuest = (quest: Quest) => {
    setUser((prevUser) => ({
      ...prevUser,
      quests: [...prevUser.quests, quest],
    }));
  };

  // Fonction pour compléter une quête
  const completeQuest = (questId: number) => {
    setUser((prevUser) => {
      const updatedQuests = prevUser.quests.map((quest) =>
        quest.id === questId ? { ...quest, completed: true } : quest
      );
      const completedQuest = prevUser.quests.find((quest) => quest.id === questId);
      if (completedQuest && !completedQuest.completed) {
        gainXP(completedQuest.reward.gold);
        addGold(completedQuest.reward.gold);
        addCrystals(completedQuest.reward.crystals);
      }
      return {
        ...prevUser,
        quests: updatedQuests,
      };
    });
  };

  // Fonction pour ajouter de l'or
  const addGold = (amount: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      gold: prevUser.gold + amount,
    }));
  };

  // Fonction pour ajouter des cristaux
  const addCrystals = (amount: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      crystals: prevUser.crystals + amount,
    }));
  };

  // Fonction pour accepter une quête
  const acceptQuest = () => {
    setUser((prevUser) => {
      if (prevUser.activeQuest) {
        return {
          ...prevUser,
          quests: [...prevUser.quests, prevUser.activeQuest],
          activeQuest: null,
        };
      }
      return prevUser;
    });
  };

  // Fonction pour refuser une quête
  const refuseQuest = () => {
    setUser((prevUser) => ({
      ...prevUser,
      activeQuest: null,
    }));
  };

  // Démarrer les quêtes périodiques
  useEffect(() => {
    const interval = setInterval(() => {
      const newQuest = generateRandomQuest();
      setUser((prevUser) => ({
        ...prevUser,
        activeQuest: newQuest
      }));
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);
  

  // Générer une quête aléatoire
  const generateRandomQuest = (): Quest => {
    const questTypes = ["physical", "combat", "social", "story"];
    const randomType = questTypes[Math.floor(Math.random() * questTypes.length)];
    const goal = Math.floor(Math.random() * 10) + 1;

    return {
      id: Math.random(),
      title: `Quête ${randomType}`,
      description: `Complète cette quête pour gagner des récompenses !`,
      type: randomType as "physical" | "combat" | "social" | "story",
      goal,
      reward: {
        gold: goal * 10,
        crystals: goal * 2,
        items: ["potion_minor"], // Récompense aléatoire
      },
      cooldown: 30,
      completed: false,
    };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        gainXP,
        updateName,
        changeClass,
        addQuest,
        completeQuest,
        addGold,
        addCrystals,
        acceptQuest,
        refuseQuest,
      }}
    >
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

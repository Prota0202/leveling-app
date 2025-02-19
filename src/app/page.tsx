"use client";

import Stats from "@/app/components/Stats";
import Quest from "@/app/components/Quest";
import Rewards from "@/app/components/Rewards";
import Leaderboard from "@/app/components/Leaderboard";
import Login from "@/app/components/Login";
import Dungeon from "@/app/components/Dungeon";
import ClassSelection from "@/app/components/ClassSelection";
import QuestPopup from "@/app/components/QuestPopup";
import { useUser } from "@/app/context/UserContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen p-4 bg-dark text-light">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-title text-primary text-center mb-8">
          Leveling App - Solo Leveling
        </h1>
        
        <div className="grid gap-4">
          <Login />
          <ClassSelection />
          <Stats />
          <Quest />
          <Rewards />
          <Leaderboard />
          <Dungeon />
          <QuestPopup />
        </div>
        </div>
    </main>
  );
}

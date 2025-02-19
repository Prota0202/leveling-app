"use client";

import { useUser } from "@/app/context/UserContext";
import { FaFire, FaBrain, FaHeart, FaRunning, FaChartLine } from "react-icons/fa";

export default function Stats() {
  const { user } = useUser();

  return (
    <div className="p-6 bg-dark rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-title text-primary mb-6">Statistiques</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rang et Classe */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-light flex items-center gap-2">
            <FaChartLine className="text-primary" />
            Rang & Classe
          </h3>
          <p className="text-sm text-gray-300 mt-2">
            <span className="font-bold">Rang:</span> {user.stats.rank}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-bold">Classe:</span> {user.class}
          </p>
        </div>

        {/* Niveau et XP */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-light flex items-center gap-2">
            <FaFire className="text-primary" />
            Niveau & XP
          </h3>
          <p className="text-sm text-gray-300 mt-2">
            <span className="font-bold">Niveau:</span> {user.level}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-bold">XP:</span> {user.xp}/300
          </p>
        </div>

        {/* Statistiques physiques */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-light flex items-center gap-2">
            <FaRunning className="text-primary" />
            Activité Physique
          </h3>
          <p className="text-sm text-gray-300 mt-2">
            <span className="font-bold">Distance:</span> {user.physicalActivity.distance} km
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-bold">Calories:</span> {user.physicalActivity.calories} cal
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-bold">Temps:</span> {user.physicalActivity.timeSpent} min
          </p>
        </div>

        {/* Statistiques de base */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-light flex items-center gap-2">
            <FaHeart className="text-primary" />
            Statistiques
          </h3>
          <p className="text-sm text-gray-300 mt-2">
            <span className="font-bold">Force:</span> {user.stats.strength}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-bold">Intelligence:</span> {user.stats.intelligence}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-bold">Endurance:</span> {user.stats.endurance}
          </p>
        </div>
      </div>
    </div>
  );
}
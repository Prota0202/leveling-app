"use client";

import { useUser } from "@/app/context/UserContext";
import { FaFire, FaBrain, FaHeart } from "react-icons/fa"; // Icônes pour les statistiques

export default function Stats() {
  const { user } = useUser();

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Statistiques</h2>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <FaFire className="text-red-500" />
          <p>
            <span className="font-semibold">Niveau :</span> {user.level}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaFire className="text-red-500" />
          <p>
            <span className="font-semibold">XP :</span> {user.xp}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaFire className="text-red-500" />
          <p>
            <span className="font-semibold">Force :</span> {user.stats.strength}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaBrain className="text-blue-500" />
          <p>
            <span className="font-semibold">Intelligence :</span> {user.stats.intelligence}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaHeart className="text-green-500" />
          <p>
            <span className="font-semibold">Endurance :</span> {user.stats.endurance}
          </p>
        </div>
      </div>
    </div>
  );
}
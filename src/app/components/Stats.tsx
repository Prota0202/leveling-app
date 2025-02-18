"use client";

import { useUser } from "@/app/context/UserContext";
import { FaFire, FaBrain, FaHeart } from "react-icons/fa"; // Import des icônes

export default function Stats() {
  const { user } = useUser();

  return (
    <div className="p-4 bg-dark rounded-lg shadow-lg">
      <h2 className="text-xl font-title text-primary mb-4">Statistiques</h2>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <FaFire className="text-primary" />
          <p className="text-light">
            <span className="font-semibold">Niveau :</span> {user.level}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaFire className="text-primary" />
          <p className="text-light">
            <span className="font-semibold">XP :</span> {user.xp}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaFire className="text-primary" />
          <p className="text-light">
            <span className="font-semibold">Force :</span> {user.stats.strength}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaBrain className="text-secondary" />
          <p className="text-light">
            <span className="font-semibold">Intelligence :</span> {user.stats.intelligence}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FaHeart className="text-danger" />
          <p className="text-light">
            <span className="font-semibold">Endurance :</span> {user.stats.endurance}
          </p>
        </div>
      </div>
    </div>
  );
}
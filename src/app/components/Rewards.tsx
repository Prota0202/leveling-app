"use client";

import { useUser } from "@/app/context/UserContext";

export default function Rewards() {
  const { user } = useUser();

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Récompenses</h2>
      <div className="space-y-2">
        {user.rewards.length > 0 ? (
          user.rewards.map((reward, index) => (
            <p key={index} className="text-sm">
              🎉 {reward}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-300">Aucune récompense pour le moment.</p>
        )}
      </div>
    </div>
  );
}
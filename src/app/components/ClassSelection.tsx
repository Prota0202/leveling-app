"use client";

import { useUser } from "@/app/context/UserContext";

export default function ClassSelection() {
  const { user, changeClass } = useUser();

  return (
    <div className="p-4 bg-dark rounded-lg shadow-lg">
      <h2 className="text-xl font-title text-primary mb-4">Choisis ta classe</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => changeClass("Guerrier")}
          className={`p-4 bg-gray-800 rounded-lg ${
            user.class === "Guerrier" ? "border-2 border-primary" : ""
          }`}
        >
          <h3 className="font-semibold text-light">Guerrier</h3>
          <p className="text-sm text-gray-300">Force : 15</p>
          <p className="text-sm text-gray-300">Intelligence : 5</p>
          <p className="text-sm text-gray-300">Endurance : 8</p>
        </button>
        <button
          onClick={() => changeClass("Mage")}
          className={`p-4 bg-gray-800 rounded-lg ${
            user.class === "Mage" ? "border-2 border-primary" : ""
          }`}
        >
          <h3 className="font-semibold text-light">Mage</h3>
          <p className="text-sm text-gray-300">Force : 5</p>
          <p className="text-sm text-gray-300">Intelligence : 15</p>
          <p className="text-sm text-gray-300">Endurance : 8</p>
        </button>
        <button
          onClick={() => changeClass("Assassin")}
          className={`p-4 bg-gray-800 rounded-lg ${
            user.class === "Assassin" ? "border-2 border-primary" : ""
          }`}
        >
          <h3 className="font-semibold text-light">Assassin</h3>
          <p className="text-sm text-gray-300">Force : 10</p>
          <p className="text-sm text-gray-300">Intelligence : 5</p>
          <p className="text-sm text-gray-300">Endurance : 15</p>
        </button>
      </div>
    </div>
  );
}
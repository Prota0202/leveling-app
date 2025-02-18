"use client";

import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

export default function Login() {
  const { user, updateName } = useUser();
  const [name, setName] = useState(user.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateName(name);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
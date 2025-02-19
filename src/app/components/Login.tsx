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
    <div className="p-6 bg-dark rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-title text-primary mb-6">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-light placeholder-gray-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary hover:bg-secondary rounded text-light"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
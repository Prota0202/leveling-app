import Stats from "@/app/components/Stats";
import Quest from "@/app/components/Quest";
import Rewards from "@/app/components/Rewards";
import Leaderboard from "@/app/components/Leaderboard";
import Login from "@/app/components/Login";
import Battle from "@/app/components/Battle";

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-gray-900 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Leveling App
        </h1>
        <div className="grid gap-4">
          <Login />
          <Stats />
          <Quest />
          <Rewards />
          <Leaderboard />
          <Battle />
        </div>
      </div>
    </main>
  );
}
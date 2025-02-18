import Stats from "C:\\Users\\AbdelBadi\\leveling-app\\src\\app\\components\\Stats";
import Quest from "C:\\Users\\AbdelBadi\\leveling-app\\src\\app\\components\\Quest";


export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Leveling App</h1>
        <div className="grid gap-4">
          <Stats />
          {/*Ajouter d'autres composants comme les quêtes, la progression, etc. */}
        </div>
      </div>
    </main>
  );
}
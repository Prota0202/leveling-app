module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Couleur principale (bleu)
        secondary: "#10B981", // Couleur secondaire (vert)
        accent: "#F59E0B", // Couleur d'accent (orange)
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"], // Utilise la police Geist
        mono: ["Geist Mono", "monospace"], // Utilise la police Geist Mono
      },
    },
  },
  plugins: [],
};
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5C00", // Orange vif pour les accents (comme les portails)
        secondary: "#00A8FF", // Bleu électrique pour les éléments magiques
        dark: "#1A1A1A", // Fond sombre
        light: "#F0F0F0", // Texte clair
        danger: "#FF0000", // Rouge pour les éléments dangereux
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"], // Police moderne
        title: ["Poppins", "sans-serif"], // Police pour les titres
      },
      backgroundImage: {
        "portal-gradient": "linear-gradient(135deg, #FF5C00, #00A8FF)", // Dégradé pour les portails
        "monster-bg": "url('/images/monster-bg.jpg')", // Image de fond pour les monstres
      },
    },
  },
  plugins: [],
};
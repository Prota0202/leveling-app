import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "C:\\Users\\AbdelBadi\\leveling-app\\src\\app\\context\\UserContext.tsx"; // Import du contexte utilisateur

// Configuration des polices Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Métadonnées de l'application
export const metadata: Metadata = {
  title: "Leveling App",
  description: "Une application inspirée de Solo Leveling pour suivre ta progression !",
};

// Layout principal
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Enveloppe l'application avec le UserProvider */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
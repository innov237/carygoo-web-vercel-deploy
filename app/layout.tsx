import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from './components/header';
import Footer from "./components/footer";

// Paire typographique délibérée : un grotesque géométrique affirmé pour les
// titres (registre "grande plateforme tech", type Uber Move) + une sans très
// lisible pour le corps de texte — cohérent sur tout le site vitrine.
const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carygoo — La plateforme de livraison tout-en-un",
  description:
    "Gérez vos livraisons, votre flotte, vos boutiques et votre réseau de points relais depuis une seule plateforme. API pour développeurs, paiements Mobile Money, rapports en temps réel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

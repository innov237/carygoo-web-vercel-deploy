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
  title: "Siara — La super app de votre quotidien",
  description:
    "Siara réunit VTC, livraison, services à domicile, restaurants et supermarché dans une seule application. Commandez, suivez en temps réel et payez en Mobile Money.",
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

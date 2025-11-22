"use client";
import React from "react";
import { Inter } from "next/font/google";

// Initialisation de la police Inter
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Données des Statistiques
const STATS = [
  { value: "100+", label: "Pays représentés" },
  { value: "20m+", label: "Commandes livrées" },
  { value: "4k+", label: "Entreprises mondiales" },
  { value: "100+", label: "Partenaires intégrés" },
];

// URLs et Positions des Icônes Flottantes
const FLOATING_IMAGES = [
  // LIGNE DU HAUT (3)
  { position: { top: "5%", left: "10%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b8202e7551ebebfa7b5b0a_paper-bag-icon-compress.avif" }, 
  { position: { top: "3%", left: "48%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b8203ccba3a2de1f177dfb_open-pizza-icon-compress.avif" }, 
  { position: { top: "6%", right: "12%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b82060a485c9d754c6c998_paper-bag-food-compress.avif" }, 

  // LIGNE DU BAS (3)
  { position: { bottom: "5%", left: "10%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b820973301223a6f19c348_delivery-bag-icon-compress.avif" }, 
  { position: { bottom: "3%", left: "50%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b820a2083639a8d1644d1f_casual-shopping-compress.avif" }, 
  { position: { bottom: "6%", right: "12%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b82078f92bbbe1e0c4d599_scooter-icon-compress.avif" }, 

  // CÔTÉ GAUCHE (1) - Masqué sur Mobile/Tablette
  { position: { top: "45%", left: "3%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b8208bf359bffd7d812250_boxes-iconn-compress.avif", hideOnMobile: true }, 

  // CÔTÉ DROIT (1) - Masqué sur Mobile/Tablette
  { position: { top: "50%", right: "5%" }, src: "https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/65b820af1c46647c8f31daed_bussines-letter-compress.avif", hideOnMobile: true }, 
];

const CarygooStatsShipdayStyle = () => {
  return (
    <section 
      // Style Shipday: min-h-screen (hauteur viewport) et fond noir
      className={`relative bg-black overflow-hidden ${inter.className} 
                  min-h-screen flex items-center justify-center`}
    >
      
      {/* 1. Conteneur des Images Flottantes (8 au total, 6 visibles sur mobile) */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-12">
        {FLOATING_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute overflow-hidden opacity-100 hover:scale-110 transition-all duration-500 z-0
              h-16 w-16 md:h-32 md:w-32
              ${img.hideOnMobile ? 'hidden md:block' : ''}
            `}
            style={img.position}
          >
            <img 
              src={img.src} 
              alt={`Icône de livraison ${idx}`} 
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* 2. Spotlight Central (Masque de lisibilité et d'Aération) */}
      {/* C'est la clé pour l'effet 'aéré' : agrandir la zone noire autour du texte. */}
      <div 
        className="absolute inset-0 z-5 pointer-events-none" 
        style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)'
        }}
      />

      {/* 3. Contenu Central (Centré, Aéré et Padding Sécurisé) */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-24"
      >
        
        {/* Titre (Gros Caractères, Contrasté) */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-16 md:mb-24 max-w-4xl mx-auto leading-tight drop-shadow-2xl">
          Les entreprises gèrent leurs livraisons locales sur <span className="text-red-600">Carygoo</span>.
        </h2>

        {/* Grille de Stats */}
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center group">
              {/* Valeur (Dégradé Rouge Lumineux, comme les chiffres mis en avant chez Shipday) */}
              <span 
                className={`text-5xl md:text-7xl font-extrabold mb-3 drop-shadow-lg
                  bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600
                `}
              >
                {stat.value}
              </span>
              
              {/* Label (Gris clair pour la lisibilité) */}
              <span className="text-base md:text-lg font-semibold text-gray-300 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CarygooStatsShipdayStyle;
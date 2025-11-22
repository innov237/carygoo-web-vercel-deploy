"use client";
import React from "react";
import { Truck, Star, RefreshCw, Sparkles } from "lucide-react";

const FEATURES = [
  {
    title: 'Automatisez vos livraisons',
    description: 'Gérez vos livraisons avec vos propres chauffeurs ou des prestataires tiers, le tout sans aucune commission.',
    icon: Truck,
  },
  {
    title: 'Avis Google 5 Étoiles',
    description: 'Récoltez davantage d\'avis positifs auprès de vos clients satisfaits et boostez votre réputation en ligne.',
    icon: Star,
  },
  {
    title: 'Recouvrement Simplifié',
    description: 'Atteignez 99% de réussite dans la récupération des remboursements tiers. Notre équipe s\'en occupe pour vous.',
    icon: RefreshCw,
  },
  {
    title: 'Analyses IA Exploitables',
    description: 'Transformez vos données clients en informations claires et concrètes grâce à l\'IA pour améliorer votre service.',
    icon: Sparkles,
  },
];

const CarygooSimpleFeatures = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête propre et centré */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-bold uppercase text-red-600 tracking-widest mb-3">
            Technologie & Performance
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight sm:text-5xl">
            Votre entreprise, propulsée par <span className="text-red-600">Carygoo AI</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Carygoo s'intègre parfaitement à vos systèmes de caisse et e-commerce. 
            Profitez de tous les outils nécessaires pour gérer vos opérations et offrir une expérience client exceptionnelle.
          </p>
        </div>

        {/* Grille simple et droite */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
                key={index} 
                className="group flex flex-col items-start p-6 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-xl transition-all duration-300"
            >
                {/* Icône Carrée */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white">
                    <feature.icon size={24} />
                </div>

                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CarygooSimpleFeatures;
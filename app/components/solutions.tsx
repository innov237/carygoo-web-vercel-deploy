"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  MapPinned,
  Store,
  Code2,
  BarChart3,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

interface SolutionCard {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}

const SOLUTIONS: SolutionCard[] = [
  {
    icon: Truck,
    title: "Flotte & dispatch",
    description:
      "Gérez vos chauffeurs et véhicules, attribuez les livraisons automatiquement et suivez chaque course en temps réel.",
    href: "/partners",
  },
  {
    icon: MapPinned,
    title: "Points relais & colis",
    description:
      "Un réseau d'agences et de points relais pour envoyer et retirer des colis entre villes, avec suivi public par numéro.",
    href: "/relay-points",
  },
  {
    icon: Store,
    title: "Boutiques & e-commerce",
    description:
      "Onboardez vos boutiques partenaires, chacune avec son propre portail et son lien de commande public.",
    href: "/shops",
  },
  {
    icon: Code2,
    title: "API pour développeurs",
    description:
      "Créez des livraisons, suivez leur statut et recevez des webhooks directement depuis votre propre système.",
    href: "/docs/partner-api",
  },
  {
    icon: BarChart3,
    title: "Rapports & analyses",
    description:
      "Rapports détaillés par chauffeur ou par boutique, classements, export PDF — pour piloter votre activité au quotidien.",
    href: "/partners",
  },
  {
    icon: Wallet,
    title: "Paiements",
    description:
      "Mobile Money (MTN/Orange), caisse de collecte, paie chauffeur — tous vos flux financiers centralisés.",
    href: "/partners",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Solutions() {
  return (
    <section id="solutions" className="bg-gray-50 py-20 md:py-28 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3">
            Une plateforme, tous vos flux logistiques
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Tout ce dont votre activité a besoin
          </h2>
          <p className="text-lg text-gray-600">
            De la gestion de flotte à l&apos;intégration API, en passant par le réseau de points relais et les
            paiements — une seule plateforme pour entreprises et particuliers.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SOLUTIONS.map((solution) => (
            <motion.a
              key={solution.title}
              href={solution.href}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-red-200 transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                <solution.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{solution.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                En savoir plus
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

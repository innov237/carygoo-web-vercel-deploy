"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Radar,
  BarChart3,
  Wallet,
  Store,
  MapPinned,
  Code2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Dispatch & gestion de flotte",
    description:
      "Ajoutez vos chauffeurs et véhicules, attribuez automatiquement chaque livraison au chauffeur disponible le plus proche, ou gérez l'attribution manuellement depuis votre tableau de bord.",
  },
  {
    icon: Radar,
    title: "Suivi en temps réel",
    description:
      "Position GPS des chauffeurs, statut de chaque livraison en direct, historique complet des courses — pour vous et pour vos clients.",
  },
  {
    icon: BarChart3,
    title: "Rapports & analyses",
    description:
      "Rapports globaux, par chauffeur ou par boutique, sur une période personnalisable — classements, séries temporelles, export PDF.",
  },
  {
    icon: Wallet,
    title: "Paiements centralisés",
    description:
      "Mobile Money (MTN/Orange), caisse de collecte des chauffeurs, paie chauffeur automatisée — tous vos flux financiers au même endroit.",
  },
];

const NETWORK = [
  {
    icon: Store,
    title: "Boutiques & e-commerce",
    description: "Onboardez des boutiques, chacune avec son portail et son lien de commande public.",
    href: "/shops",
  },
  {
    icon: MapPinned,
    title: "Réseau de points relais",
    description: "Connectez-vous à un réseau d'agences et de points relais pour l'envoi de colis inter-villes.",
    href: "/relay-points",
  },
  {
    icon: Code2,
    title: "API pour développeurs",
    description: "Intégrez la création et le suivi de livraisons directement dans votre propre système.",
    href: "/docs/partner-api",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* HERO */}
      <section className="py-20 md:py-32 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance"
        >
          Gérez toutes vos livraisons{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            depuis une seule plateforme
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Flotte, dispatch, boutiques, réseau de points relais, API et paiements — Carygoo centralise toute la
          logistique de votre entreprise.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-red-600/20"
          >
            Nous contacter <ArrowRight size={18} />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center border border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-medium py-3 px-8 rounded-xl text-lg transition-all duration-200"
          >
            Voir les tarifs
          </a>
        </motion.div>
      </section>

      {/* FONCTIONNALITÉS (fond sombre) */}
      <section className="py-16 md:py-24 px-4 bg-gray-950 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-balance"
        >
          Tout ce qu&apos;il faut pour <span className="text-red-500">piloter votre activité</span>
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-gray-900 p-7 rounded-2xl border-t-4 border-red-600 shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ÉTENDEZ VOTRE RÉSEAU */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-4 text-gray-900 text-balance"
        >
          Étendez votre <span className="text-red-600">réseau</span>
        </motion.h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-16">
          Au-delà de la gestion de flotte, connectez votre activité à l&apos;écosystème Carygoo.
        </p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {NETWORK.map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-red-200 transition-shadow duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{item.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                Découvrir
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 text-center max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-balance"
        >
          Prêt à simplifier vos <span className="text-red-600">livraisons</span> ?
        </motion.h2>
        <p className="text-xl text-gray-600 mb-8">
          Parlons de votre activité et trouvons l&apos;offre qui vous correspond.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Nous contacter <ArrowRight size={18} />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center border border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-medium py-3 px-8 rounded-xl text-lg transition-all duration-200"
          >
            Voir les tarifs
          </a>
        </div>
      </section>
    </div>
  );
}

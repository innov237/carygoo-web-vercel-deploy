"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Store,
  Link2,
  LayoutDashboard,
  Wallet,
  UserPlus,
  Share2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "1. Onboardez votre boutique",
    description: "Ajoutez votre boutique depuis votre tableau de bord partenaire, avec son adresse et son propriétaire dédié.",
  },
  {
    icon: Share2,
    title: "2. Partagez votre lien de commande",
    description: "Chaque boutique reçoit un lien public pré-rempli — vos clients commandent directement, sans créer de compte.",
  },
  {
    icon: BadgeCheck,
    title: "3. Livrez et encaissez",
    description: "La livraison est dispatchée automatiquement, et la boutique est payée via la caisse du partenaire.",
  },
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Portail dédié par boutique",
    description: "Chaque propriétaire de boutique gère ses propres commandes et consulte ses rapports d'activité, en toute autonomie.",
  },
  {
    icon: Link2,
    title: "Lien de commande public",
    description: "Un lien partageable par boutique, prêt à être diffusé sur les réseaux sociaux ou envoyé directement aux clients.",
  },
  {
    icon: Store,
    title: "Plusieurs boutiques, un seul réseau",
    description: "Gérez un nombre illimité de boutiques depuis votre compte partenaire, chacune avec son propre historique.",
  },
  {
    icon: Wallet,
    title: "Paiement via la caisse",
    description: "Le montant net dû à chaque boutique (ventes moins frais) est calculé et réglé depuis la caisse du partenaire.",
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

export default function ShopsPage() {
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
          Donnez à chaque boutique{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            sa propre livraison
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Onboardez vos boutiques partenaires, chacune avec son portail et son lien de commande public — la
          livraison se dispatche automatiquement.
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

      {/* COMMENT ÇA MARCHE */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-4xl font-bold text-center mb-16 text-gray-900 text-balance"
        >
          Comment ça <span className="text-red-600">marche</span>
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FONCTIONNALITÉS (fond sombre) */}
      <section className="py-16 md:py-24 px-4 bg-gray-950 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-4xl font-bold text-center mb-16 text-balance"
        >
          Pensé pour les <span className="text-red-500">e-commerçants</span>
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-gray-900 p-7 rounded-2xl border-t-4 border-red-600"
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 text-center max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-balance"
        >
          Prêt à connecter vos <span className="text-red-600">boutiques</span> ?
        </motion.h2>
        <p className="text-xl text-gray-600 mb-8">
          Parlons de votre réseau de boutiques et de vos besoins de livraison.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Nous contacter <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}

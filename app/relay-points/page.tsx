"use client";
import React from "react";
import { motion } from "framer-motion";
import { PackageSearch, MapPinned, Building2, Truck, ArrowRight, ShieldCheck, Clock3, Package } from "lucide-react";

import TrackingWidget from "../components/TrackingWidget";
import RelayPointSearchWidget from "../components/RelayPointSearchWidget";

const STEPS = [
  {
    icon: Package,
    title: "1. Déposez votre colis",
    description: "Dans une agence Carygoo ou un point relais partenaire, avec le type de colis et le mode de livraison souhaité.",
  },
  {
    icon: Truck,
    title: "2. Transit inter-villes",
    description: "Votre colis voyage via le réseau d'agences, sur des trajets planifiés avec horaires de départ et délai estimé.",
  },
  {
    icon: MapPinned,
    title: "3. Retrait au point relais",
    description: "Le destinataire retire son colis au point relais choisi, ou reçoit une livraison à domicile.",
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

export default function RelayPointsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* HERO */}
      <section className="bg-gray-50 border-b border-gray-200 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3"
          >
            Réseau de points relais
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-5 text-balance"
          >
            Envoyez un colis entre villes,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
              retirez-le où vous voulez
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Un réseau d&apos;agences et de points relais indépendants pour l&apos;envoi de colis inter-villes, avec
            suivi public à chaque étape.
          </motion.p>
        </div>
      </section>

      {/* SUIVI DE COLIS */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 justify-center mb-2">
            <PackageSearch className="w-5 h-5 text-red-600" />
            <h2 className="text-2xl font-bold">Suivre un colis</h2>
          </div>
          <p className="text-center text-gray-600 mb-8">
            Entrez votre numéro de suivi — ajoutez le code PIN reçu par l&apos;expéditeur pour voir les coordonnées
            complètes.
          </p>
          <TrackingWidget />
        </div>
      </section>

      {/* RECHERCHE DE POINTS RELAIS */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 justify-center mb-2">
            <Building2 className="w-5 h-5 text-red-600" />
            <h2 className="text-2xl font-bold">Trouver un point relais</h2>
          </div>
          <p className="text-center text-gray-600 mb-8">
            Recherchez par ville ou par nom pour trouver le point relais le plus pratique.
          </p>
          <RelayPointSearchWidget />
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-16 md:py-24 px-4 bg-gray-950 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-4xl font-bold text-center mb-16 text-balance"
        >
          Comment ça <span className="text-red-500">marche</span>
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {STEPS.map((step) => (
            <motion.div key={step.title} variants={fadeUp} className="bg-gray-900 p-7 rounded-2xl border-t-4 border-red-600">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-red-500" /> Colis fragiles, périssables et documents pris en charge
          </div>
          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-red-500" /> Horaires de départ et délai estimé par trajet
          </div>
        </motion.div>
      </section>

      {/* DEVENIR POINT RELAIS */}
      <section className="py-20 md:py-28 text-center max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-4xl font-bold mb-4 text-balance"
        >
          Devenez <span className="text-red-600">point relais</span>
        </motion.h2>
        <p className="text-lg text-gray-600 mb-8">
          Vous avez une boutique ou un local accessible ? Rejoignez le réseau Carygoo et générez un revenu
          complémentaire en accueillant les dépôts et retraits de colis.
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

"use client";
import React from "react";
import { motion } from "framer-motion";

import {
    // Section Clients
    MapPin, SmilePlus, MessageSquare, MailCheck,
    // Section Managers
    LayoutDashboard, LocateFixed, Bot, Layers,
    // Section Reviews
    Send, Star, Search, ThumbsUp,
    // Section AI
    Zap, PieChart, MessageSquareText, Headphones,
    // Section Drivers
    Smartphone, ClipboardList, MessageCircle, Route,
} from "lucide-react";

import { Inter } from "next/font/google";

// Configuration de la police "Inter" pour un look pro
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Données structurées avec icônes spécifiques pour chaque point
const SECTIONS = [
    {
        id: "customers",
        img:"",
        title: "Pour vos clients",
        description: "Offrez une expérience de livraison transparente qui fidélise votre clientèle.",
        features: [
            { text: "Suivi livreur temps réel (Live tracking)", icon: MapPin },
            { text: "Feedback instantané des clients", icon: SmilePlus },
            { text: "Notifications SMS automatiques", icon: MessageSquare },
            { text: "Confirmation par email et SMS", icon: MailCheck },
        ],
        imagePosition: "right",
    },
    {
        id: "managers",
        img:"",
        title: "Pour les gestionnaires",
        description: "Gérez vos opérations depuis une interface unique, accessible sur web, tablette et mobile.",
        features: [
            { text: "Dashboard centralisé livraisons", icon: LayoutDashboard },
            { text: "Localisation flotte en temps réel", icon: LocateFixed },
            { text: "Attribution intelligente (Auto-dispatch)", icon: Bot },
            { text: "Coursiers tiers (Uber, DoorDash...) le jour même", icon: Layers },
        ],
        imagePosition: "left",
    },
    {
        id: "growth",
        img:"",
        title: "Boostez vos Avis Google",
        description: "Transformez la satisfaction client en opportunités commerciales grâce à l'automatisation.",
        features: [
            { text: "Collecte d'avis automatique post-livraison", icon: Send },
            { text: "Ciblage des avis 5 étoiles", icon: Star },
            { text: "Boost de visibilité SEO local", icon: Search },
            { text: "Gestion de votre e-réputation", icon: ThumbsUp },
        ],
        imagePosition: "right",
    },
    {
        id: "ai",
        img:"",
        title: "Siara AI & Rapports",
        description: "L'intelligence artificielle au service de votre performance opérationnelle.",
        features: [
            { text: "Boost de performance via IA", icon: Zap },
            { text: "Rapports détaillés et analyses", icon: PieChart },
            { text: "Réponses aux avis assistées par IA", icon: MessageSquareText },
            { text: "Support d'intégration dédié", icon: Headphones },
        ],
        imagePosition: "left",
    },
    {
        id: "drivers",
        img:"",
        title: "Pour les chauffeurs",
        description: "Une application mobile intuitive conçue pour faciliter le travail de vos livreurs sur le terrain.",
        features: [
            { text: "App Mobile dédiée (iOS & Android)", icon: Smartphone },
            { text: "Détails de commande simplifiés", icon: ClipboardList },
            { text: "Chat intégré Dispatch/Livreur", icon: MessageCircle },
            { text: "Preuve de livraison & Optimisation", icon: Route },
        ],
        imagePosition: "right",
    },
];

const AppFeatures = () => {
    return (
        <section className={`py-24 bg-white overflow-hidden ${inter.className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* En-tête */}
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <p className="text-sm font-bold uppercase text-brand-600 tracking-widest mb-3">
                        Solution Tout-en-un
                    </p>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight sm:text-5xl leading-tight">
                        Votre référence pour des <br className="hidden sm:block" /> livraisons simplifiées
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Commencez à prendre des commandes ou élargissez votre zone de livraison.
                        Utilisez vos propres chauffeurs ou le vaste réseau de partenaires Siara.
                    </p>
                </div>

                {/* Boucle Sections */}
                <div className="relative space-y-24 lg:space-y-32">
                    {/* Ligne serpentine reliant les modules, côté image à chaque étape */}
                    <svg
                        viewBox="0 0 100 500"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full lg:block"
                        aria-hidden="true"
                    >
                        <path
                            d="M80,50 C80,100 20,100 20,150 C20,200 80,200 80,250 C80,300 20,300 20,350 C20,400 80,400 80,450"
                            fill="none"
                            stroke="#FF296C"
                            strokeWidth="0.6"
                            strokeDasharray="1.4 2.2"
                            className="animate-[cg-flow_6s_linear_infinite]"
                            opacity="0.35"
                            vectorEffect="non-scaling-stroke"
                        />
                        {[
                            [80, 50],
                            [20, 150],
                            [80, 250],
                            [20, 350],
                            [80, 450],
                        ].map(([x, y], i) => (
                            <circle key={i} cx={x} cy={y} r="1.6" fill="#FF296C" opacity="0.5" />
                        ))}
                    </svg>

                    {SECTIONS.map((section) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
                        >
                            {/* Colonne Texte */}
                            <div className={`flex-1 ${section.imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
                                <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                                    {section.title}
                                </h3>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {section.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                    {section.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start group">
                                            <div className="shrink-0 mt-1">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white border border-brand-100 group-hover:border-brand-600">
                                                    <feature.icon size={20} strokeWidth={2.5} />
                                                </div>
                                            </div>
                                            <span className="ml-4 text-base font-medium text-gray-800 group-hover:text-brand-700 transition-colors duration-300">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Colonne Visuel : mockup animé composé des icônes de la section */}
                            <div className={`flex-1 w-full ${section.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white shadow-lg">
                                    {/* Grille de fond subtile */}
                                    <div className="absolute inset-0 bg-gray-50 opacity-50 pattern-dots" />

                                    {/* Reflet lumineux qui balaie la carte */}
                                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/60 to-transparent animate-[sheen_4s_ease-in-out_infinite]" />

                                    <div className="relative z-10 grid h-full grid-cols-2 place-items-center gap-6 p-10">
                                        {section.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.7 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true, amount: 0.5 }}
                                                transition={{ duration: 0.4, delay: 0.15 * idx, type: "spring", stiffness: 200 }}
                                                whileHover={{ scale: 1.08 }}
                                                className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-md ring-1 ring-gray-100"
                                            >
                                                <feature.icon size={28} strokeWidth={2} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AppFeatures;
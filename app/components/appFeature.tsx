"use client";
import React from "react";

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
    // UI Générale
    Image as ImageIcon
} from "lucide-react";

import { Inter } from "next/font/google";

// Configuration de la police "Inter" pour un look pro
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Données structurées avec icônes spécifiques pour chaque point
const SECTIONS = [
    {
        id: "customers",
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
        title: "Pour les gestionnaires",
        description: "Gérez vos opérations depuis une interface unique, accessible sur web, tablette et mobile.",
        features: [
            { text: "Dashboard centralisé livraisons", icon: LayoutDashboard },
            { text: "Localisation flotte en temps réel", icon: LocateFixed },
            { text: "Attribution intelligente (Auto-dispatch)", icon: Bot },
            { text: "Accès réseaux tiers (Uber, DoorDash...)", icon: Layers },
        ],
        imagePosition: "left",
    },
    {
        id: "growth",
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
        title: "Carygoo AI & Rapports",
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
                    <p className="text-sm font-bold uppercase text-red-600 tracking-widest mb-3">
                        Solution Tout-en-un
                    </p>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight sm:text-5xl leading-tight">
                        Votre référence pour des <br className="hidden sm:block" /> livraisons simplifiées
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Commencez à prendre des commandes ou élargissez votre zone de livraison.
                        Utilisez vos propres chauffeurs ou le vaste réseau de partenaires Carygoo.
                    </p>
                </div>

                {/* Boucle Sections */}
                <div className="space-y-24 lg:space-y-32">
                    {SECTIONS.map((section) => (
                        <div
                            key={section.id}
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
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white border border-red-100 group-hover:border-red-600">
                                                    <feature.icon size={20} strokeWidth={2.5} />
                                                </div>
                                            </div>
                                            <span className="ml-4 text-base font-medium text-gray-800 group-hover:text-red-700 transition-colors duration-300">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Colonne Image */}
                            <div className={`flex-1 w-full ${section.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
                                <div className="relative aspect-[4/3] w-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg group">
                                    {/* Décoration de fond subtile */}
                                    <div className="absolute inset-0 bg-gray-50 opacity-50 pattern-dots" />

                                    {/* Placeholder pour l'image */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                        <div className="p-6 bg-white rounded-full shadow-sm mb-4 border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                                            <ImageIcon size={40} className="text-gray-300 group-hover:text-red-500 transition-colors duration-300" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                            Interface {section.title}
                                        </p>
                                    </div>

                                    {/* Exemple d'implémentation réelle d'image (à décommenter) */}
                                    {/* <Image 
                        src={`/images/${section.id}.png`} 
                        alt={section.title}
                        fill
                        className="object-cover object-center"
                    /> 
                    */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AppFeatures;
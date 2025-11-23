"use client";
import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Gift, ArrowRight } from 'lucide-react';

// Données des témoignages
const TESTIMONIALS = [
    {
        quote: "Carygoo a aidé KFC Amérique Latine à livrer en moins de 30 minutes, transformant notre expérience client.",
        name: "Yasser Rodrigues",
        title: "Directeur mondial des opérations",
        company: "KFC Amérique Latine"
    },
    {
        quote: "Nos revenus ont augmenté de 100% au cours des 12 premiers mois d'utilisation de Carygoo.",
        name: "Omar Zebi",
        title: "Propriétaire de restaurant",
        company: "Hoboken, NJ"
    },
    {
        quote: "Nous avons amélioré notre efficacité opérationnelle et élevé la qualité de notre service de livraison, offrant une expérience supérieure.",
        name: "Carlos Paz",
        title: "Directeur de Franchise",
        company: "Honduras"
    },
];

const SignUpTestimonialPageFinal: React.FC = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    // Logique du Slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prevIndex) =>
                (prevIndex + 1) % TESTIMONIALS.length
            );
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const testimonial = TESTIMONIALS[currentTestimonial];

    return (
        // 1. Conteneur externe : Hauteur dynamique sur mobile, h-screen sur desktop, sans marge latérale.
        <section className="bg-gray-50 flex items-stretch justify-center w-full py-0 lg:h-screen">

            {/* 2. Conteneur Interne : Prend toute la largeur (w-screen), grille 1/2 sur desktop, sans ombres. */}
            <div
                className="pt-20 bg-white rounded-none overflow-hidden w-screen lg:w-full lg:h-full grid grid-cols-1 lg:grid-cols-2 border border-gray-200"
            >

                {/* Colonne de Gauche : Formulaire */}
                <div className="p-8 md:p-12 lg:overflow-y-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Créez votre compte Carygoo
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Rejoignez des milliers d'entreprises qui gèrent leurs livraisons.
                    </p>

                    <form className="space-y-6">

                        {/* Champ: Nom */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Votre nom"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                required
                            />
                        </div>

                        {/* Champ: Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Adresse e-mail"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                required
                            />
                        </div>

                        {/* Champ: Mot de passe */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                required
                            />
                        </div>

                        {/* Champ: Code Promo (Optionnel) */}
                        <div className="relative">
                            <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Code promo (optionnel)"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                            />
                        </div>

                        {/* Bouton d'Inscription */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition duration-200 mt-8"
                        >
                            Créer mon compte <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </form>

                    {/* Lien de Connexion */}
                    <div className="mt-6 text-center text-gray-600">
                        Vous avez déjà un compte ?{' '}
                        <a href="#" className="font-semibold text-red-600 hover:text-red-700">
                            Connectez-vous
                        </a>
                    </div>
                </div>

                {/* Colonne de Droite : Slider de Témoignages (Fond Snow #FFFAFA) */}
                <div
                    // Changement Clé : Application de la couleur #FFFAFA (Snow) et texte adapté
                    className="relative flex bg-[#FFFAFA] p-8 lg:p-12 text-gray-900 items-center justify-center border-t border-gray-200 lg:border-t-0 lg:h-full"
                >

                    <div className="relative flex flex-col items-center justify-center w-full">
                        {/* Contenu du Témoignage Actuel */}
                        <div className="text-center transition-opacity duration-700 ease-in-out px-4">
                            <blockquote
                                // Texte principal en noir/gris foncé
                                className="text-lg sm:text-xl lg:text-3xl font-extrabold italic leading-relaxed mb-8 text-gray-900"
                            >
                                &ldquo;{testimonial.quote}&rdquo;
                            </blockquote>
                            <p
                                // Texte d'accentuation en rouge
                                className="text-base sm:text-lg font-bold text-red-600 mb-1"
                            >
                                {testimonial.name}
                            </p>
                            <p
                                // Texte secondaire en gris
                                className="text-sm sm:text-md text-gray-600"
                            >
                                {testimonial.title}, {testimonial.company}
                            </p>
                        </div>

                        {/* Indicateurs de Slide */}
                        <div
                            className="flex justify-center space-x-2 mt-8"
                        >
                            {TESTIMONIALS.map((_, index) => (
                                <div
                                    key={index}
                                    // Indicateurs de couleur ajustée pour le fond clair
                                    className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-red-600 w-6' : 'bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpTestimonialPageFinal;
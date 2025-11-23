"use client";
import React from 'react';
import { User, DollarSign, TrendingUp, CircleCheck, Zap, UserPlus, Link, CircleDollarSign } from 'lucide-react';

const PartnersPageRedesignedBlock3: React.FC = () => {
    return (
        // Couleur de fond principale : Blanc cassé
        <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">

            {/* 1. Section Héro et CTA Principal (Clair) */}
            <section className="py-20 md:py-32 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
                    <span className="text-gray-900">
                        Devenez
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 ml-3">
                        Partenaire Carygoo
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Rejoignez le Programme Partenaire Carygoo. Un moyen simple et illimité de générer des revenus récurrents en connectant des entreprises à notre plateforme de livraison.
                </p>

                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                    <a
                        href="#"
                        className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Appliquer Maintenant
                    </a>
                    <a
                        href="#"
                        className="w-full sm:w-auto text-center border border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-medium py-3 px-8 rounded-xl text-lg transition duration-200"
                    >
                        Connexion Partenaire
                    </a>
                </div>
            </section>

            {/* --- Séparateur Visuel --- */}
            <hr className="max-w-4xl mx-auto border-gray-200" />

            {/* 2. Section des Bénéfices (Fond Noir) */}
            <section className="py-16 md:py-24 px-4 bg-black text-white">
                <h2 className="text-4xl font-extrabold text-center mb-16">
                    Découvrez les <span className="text-red-600">avantages</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {/* Bénéfice 1: Revenue Share */}
                    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl hover:shadow-xl transition duration-300 border-t-4 border-red-600">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">
                            Obtenez 20% de part de revenus récurrents
                        </h3>
                        <p className="text-gray-400">
                            Augmentez vos revenus facilement grâce à notre programme de partage récurrent. Chaque mois, vous touchez une commission sur les abonnements de vos références.
                        </p>
                    </div>

                    {/* Bénéfice 2: No Limits */}
                    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl hover:shadow-xl transition duration-300 border-t-4 border-red-600">
                         <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">
                            Générez des revenus illimités
                        </h3>
                        <p className="text-gray-400">
                            Il n'y a aucune limite de gains qui puisse vous freiner. Plus vous référencez de clients, plus vous gagnez !
                        </p>
                    </div>

                    {/* Bénéfice 3: Upgrade Business */}
                    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl hover:shadow-xl transition duration-300 border-t-4 border-red-600">
                         <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">
                            Propulsez votre entreprise
                        </h3>
                        <p className="text-gray-400">
                            Monétisez votre réseau et faites évoluer votre propre activité grâce à des options de mise à niveau fluides de nos services.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Section Processus (Redessinée - Cartes et Timeline) */}
            <section className="py-16 md:py-24 px-4 bg-gray-50">
                <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">
                    Devenez Partenaire en toute <span className="text-red-600">simplicité</span>
                </h2>
                
                {/* Conteneur des étapes avec lignes de connexion simulées sur desktop */}
                <div 
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative 
                                after:content-[''] after:absolute after:hidden lg:after:block after:top-1/4 after:left-0 after:right-0 after:h-0.5 after:bg-red-200"
                >

                    {/* Étape 1: Remplissez les conditions */}
                    <div className="relative z-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-md shadow-red-700/40 border-4 border-gray-50">1</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">1. Remplissez les conditions</h3>
                        <ul className="text-left text-gray-600 space-y-3">
                            <li className="flex items-start"><CircleCheck className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Compte Stripe ou PayPal pour le paiement</li>
                            <li className="flex items-start"><CircleCheck className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Au moins 5 comptes actifs référés (total)</li>
                            <li className="flex items-start"><CircleCheck className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Doit opérer dans les pays approuvés</li>
                        </ul>
                    </div>
                    
                    {/* Étape 2: Créez votre compte */}
                    <div className="relative z-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-8 md:mt-0">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-md shadow-red-700/40 border-4 border-gray-50">2</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">2. Créez votre compte</h3>
                        <ul className="text-left text-gray-600 space-y-3">
                            <li className="flex items-start"><UserPlus className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Inscrivez-vous gratuitement en tant que partenaire</li>
                            <li className="flex items-start"><Link className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Invitez des utilisateurs avec votre lien unique</li>
                            <li className="flex items-start"><Link className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> L'inscription via le lien lie le compte à votre ID partenaire</li>
                        </ul>
                    </div>

                    {/* Étape 3: Profitez des bénéfices */}
                    <div className="relative z-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-8 md:mt-0">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-md shadow-red-700/40 border-4 border-gray-50">3</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">3. Profitez des bénéfices</h3>
                        <ul className="text-left text-gray-600 space-y-3">
                            <li className="flex items-start"><CircleDollarSign className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> 20% de part de revenus récurrents</li>
                            <li className="flex items-start"><CircleDollarSign className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Dépôt mensuel sur votre compte Stripe/PayPal</li>
                            <li className="flex items-start"><User className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" /> Accès aux supports de formation Carygoo</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 4. Section CTA Finale (Clair) */}
            <section className="py-20 md:py-32 text-center max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                    Commencez à gagner de l'argent <span className="text-red-600">aujourd'hui !</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Obtenez 20% de part de revenus continue chaque mois.
                </p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                    <a
                        href="#"
                        className="w-full sm:w-auto text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition duration-200 shadow-md hover:shadow-lg"
                    >
                        Appliquer Maintenant
                    </a>
                    <a
                        href="#"
                        className="w-full sm:w-auto text-center border border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-medium py-3 px-8 rounded-xl text-lg transition duration-200"
                    >
                        Connexion Partenaire
                    </a>
                </div>
            </section>
        </div>
    );
};

export default PartnersPageRedesignedBlock3;
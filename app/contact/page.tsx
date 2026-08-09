"use client";
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, MessageSquare, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FieldErrors {
    [field: string]: string[];
}

const ContactPage: React.FC = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

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

    const fieldError = (field: string) => fieldErrors[field]?.[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFieldErrors({});
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, company, message }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
            } else if (result.data && typeof result.data === "object") {
                setFieldErrors(result.data);
                setFormError("Le formulaire contient des erreurs — corrigez-les ci-dessous.");
            } else {
                setFormError(result.message || "Une erreur est survenue.");
            }
        } catch {
            setFormError("Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        Parlons de votre projet
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Décrivez-nous votre besoin, un membre de l&apos;équipe Carygoo vous recontacte rapidement.
                    </p>

                    {isSuccess ? (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-6 flex items-start gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-green-800">Message envoyé !</p>
                                <p className="text-green-700 text-sm mt-1">
                                    Merci, notre équipe vous recontactera très prochainement à l&apos;adresse{" "}
                                    <strong>{email}</strong>.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {formError && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                    {formError}
                                </div>
                            )}

                            {/* Champ: Nom */}
                            <div>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                        required
                                    />
                                </div>
                                {fieldError("name") && <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>}
                            </div>

                            {/* Champ: Email */}
                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Adresse e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                        required
                                    />
                                </div>
                                {fieldError("email") && <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>}
                            </div>

                            {/* Champ: Téléphone (optionnel) */}
                            <div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        placeholder="Numéro de téléphone (optionnel)"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    />
                                </div>
                                {fieldError("phone") && <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>}
                            </div>

                            {/* Champ: Entreprise (optionnel) */}
                            <div>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Nom de votre entreprise (optionnel)"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900"
                                    />
                                </div>
                                {fieldError("company") && <p className="mt-1 text-xs text-red-600">{fieldError("company")}</p>}
                            </div>

                            {/* Champ: Message */}
                            <div>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <textarea
                                        placeholder="Votre message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={4}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-900 resize-none"
                                        required
                                    />
                                </div>
                                {fieldError("message") && <p className="mt-1 text-xs text-red-600">{fieldError("message")}</p>}
                            </div>

                            {/* Bouton d'envoi */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition duration-200 mt-8 disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>Envoyer mon message <ArrowRight className="ml-2 w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    )}
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

export default ContactPage;

import React from "react";
import { Car, Package, House, UtensilsCrossed, ShoppingBasket, Pill, type LucideIcon } from "lucide-react";

interface Universe {
    icon: LucideIcon;
    title: string;
    description: string;
}

// Les univers grand public de la super app Siara.
const UNIVERSES: Universe[] = [
    {
        icon: Car,
        title: "VTC",
        description: "Commandez un chauffeur en quelques secondes, suivez son arrivée et payez sans espèces.",
    },
    {
        icon: Package,
        title: "Livraison de colis",
        description: "Envoyez et recevez vos colis en ville, avec suivi en temps réel et preuve de livraison.",
    },
    {
        icon: House,
        title: "Services à domicile",
        description: "Ménage, plomberie, électricité, beauté… des prestataires vérifiés directement chez vous.",
    },
    {
        icon: UtensilsCrossed,
        title: "Restaurants",
        description: "Vos restaurants préférés livrés chauds, du petit-déjeuner au dîner.",
    },
    {
        icon: ShoppingBasket,
        title: "Supermarché",
        description: "Faites vos courses en ligne et recevez-les le jour même.",
    },
    {
        icon: Pill,
        title: "Pharmacie & plus",
        description: "Pharmacie, boutiques de quartier et de nouveaux services ajoutés régulièrement.",
    },
];

export default function SuperAppServices() {
    return (
        <section id="services" className="relative bg-brand-950 py-20 sm:py-28 overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-600/40 blur-[120px]" />
                <div className="absolute -bottom-32 -right-20 h-[20rem] w-[20rem] rounded-full bg-coral-500/20 blur-[100px]" />
            </div>

            <div className="relative max-w-screen-xl px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-14">
                    <p className="text-sm font-bold uppercase tracking-widest text-coral-400 mb-3">La super app</p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
                        Tout votre quotidien, <span className="text-coral-400">une seule app</span>.
                    </h2>
                    <p className="mt-4 text-lg text-brand-100/80">
                        Un compte, un portefeuille, un suivi en temps réel pour tous vos services.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {UNIVERSES.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-coral-400/50 hover:bg-white/10"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white transition-colors duration-300 group-hover:bg-coral-500">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                            <p className="text-sm leading-relaxed text-brand-100/75">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

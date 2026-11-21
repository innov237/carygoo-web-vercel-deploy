"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Package,
  House,
  UtensilsCrossed,
  ShoppingBasket,
  Pill,
  Search,
  CheckCircle2,
  Wallet,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.hylancompany.carygoo";
const APP_STORE_URL = "https://apps.apple.com/cm/app/carygoo/id6738035989";

// Les univers de la super app Siara, affichés en effet machine à écrire
const FLAGSHIP_MODULES = [
  "vos trajets en VTC",
  "vos livraisons",
  "les services à domicile",
  "vos restaurants préférés",
  "vos courses au supermarché",
  "vos paiements Mobile Money",
];

const TYPING_SPEED = 70;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPED = 1600;
const PAUSE_AFTER_DELETED = 300;

// Effet machine à écrire : tape chaque module, l'efface, puis passe au suivant
function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!deleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPED);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, PAUSE_AFTER_DELETED);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? DELETING_SPEED : TYPING_SPEED);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, wordIndex, words]);

  return words[wordIndex].substring(0, subIndex);
}

const APP_TILES: { icon: LucideIcon; label: string; tint: string }[] = [
  { icon: Car, label: "VTC", tint: "bg-brand-600 text-white" },
  { icon: Package, label: "Colis", tint: "bg-coral-500 text-white" },
  { icon: UtensilsCrossed, label: "Restos", tint: "bg-brand-100 text-brand-700" },
  { icon: ShoppingBasket, label: "Courses", tint: "bg-coral-100 text-coral-700" },
  { icon: House, label: "Maison", tint: "bg-brand-100 text-brand-700" },
  { icon: Pill, label: "Pharma", tint: "bg-coral-100 text-coral-700" },
];

// Icônes officielles simplifiées des stores (badges de téléchargement).
const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
    <path fill="#34A853" d="M3.6 1.8 13.4 12 3.6 22.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2Z" />
    <path fill="#FBBC04" d="m16.8 8.6-3.4 3.4 3.4 3.4 3.9-2.2c1.1-.6 1.1-1.8 0-2.4l-3.9-2.2Z" />
    <path fill="#4285F4" d="M3.6 1.8c.3-.2.8-.2 1.3.1l11.9 6.7-3.4 3.4L3.6 1.8Z" />
    <path fill="#EA4335" d="m13.4 12 3.4 3.4-11.9 6.7c-.5.3-1 .3-1.3.1L13.4 12Z" />
  </svg>
);
const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1ZM13.9 5c.7-.9 1.2-2 1.1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.5Z" />
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Hero: React.FC = () => {
  const typedModule = useTypewriter(FLAGSHIP_MODULES);

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Fond : halos de la charte + grille pointillée estompée */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-brand-400/25 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-coral-400/15 blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#5903DB_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-screen-xl items-center gap-16 px-4 lg:grid-cols-12 lg:gap-8">
        {/* ======== Texte ======== */}
        <div className="lg:col-span-7">
          <motion.a
            {...fadeUp(0)}
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 py-1 pl-1 pr-4 text-sm font-medium text-gray-700 shadow-sm backdrop-blur hover:border-brand-200"
          >
            <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">Nouveau</span>
            Carygoo devient Siara
            <Sparkles className="h-4 w-4 text-coral-500" />
          </motion.a>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 max-w-2xl text-[2.6rem] font-bold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl xl:text-7xl"
          >
            Une seule app pour
            <span className="block min-h-[2.2em] sm:min-h-[1.15em] bg-linear-to-r from-brand-600 via-brand-500 to-coral-500 bg-clip-text text-transparent">
              {typedModule}
              <span className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse rounded-full bg-coral-500 align-middle" />
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Siara est la super app du quotidien : VTC, livraison, services à domicile, restaurants,
            supermarché et bien plus. Commandez, suivez en temps réel et payez en toute simplicité.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gray-950 px-5 py-3 text-white shadow-lg shadow-gray-950/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-600/30"
            >
              <PlayGlyph />
              <span className="text-left leading-tight">
                <span className="block text-[11px] uppercase tracking-wide text-white/70">Disponible sur</span>
                <span className="block text-lg font-semibold">Google Play</span>
              </span>
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-gray-950 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
            >
              <AppleGlyph />
              <span className="text-left leading-tight">
                <span className="block text-[11px] uppercase tracking-wide text-gray-500">Télécharger sur</span>
                <span className="block text-lg font-semibold">l&apos;App Store</span>
              </span>
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-coral-500" />
              Mobile Money, carte ou espèces
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-600" />
              Chauffeurs et prestataires vérifiés
            </div>
          </motion.div>
        </div>

        {/* ======== Maquette téléphone ======== */}
        <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.8rem] border-[10px] border-gray-950 bg-gray-950 shadow-2xl shadow-brand-900/30"
          >
            <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-gray-950" />
            <div className="overflow-hidden rounded-[2.2rem] bg-gray-50">
              {/* En-tête de l'app */}
              <div className="bg-linear-to-br from-brand-600 to-brand-800 px-5 pb-6 pt-12 text-white">
                <p className="text-sm text-white/70">Bonjour 👋</p>
                <p className="text-xl font-bold">Où allons-nous ?</p>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm text-gray-400">
                  <Search className="h-4 w-4 text-brand-600" />
                  Rechercher un service, une adresse…
                </div>
              </div>

              {/* Grille des services */}
              <div className="-mt-3 rounded-t-3xl bg-gray-50 px-4 pt-5">
                <div className="grid grid-cols-3 gap-3">
                  {APP_TILES.map(({ icon: Icon, label, tint }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.06 }}
                      className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 shadow-sm"
                    >
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-semibold text-gray-700">{label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bannière promo */}
                <div className="mt-4 flex items-center justify-between overflow-hidden rounded-2xl bg-linear-to-r from-coral-500 to-coral-600 p-4 text-white">
                  <div>
                    <p className="text-xs font-medium text-white/80">Offre de bienvenue</p>
                    <p className="text-base font-bold leading-tight">-20 % sur votre<br />première course</p>
                  </div>
                  <Car className="h-12 w-12 opacity-30" />
                </div>

                {/* Activité récente */}
                <div className="mt-4 mb-6 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <UtensilsCrossed className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Commande en route</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-brand-500 to-coral-500"
                        initial={{ width: "15%" }}
                        animate={{ width: ["15%", "85%"] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-600">12 min</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cartes flottantes */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1 }, x: { delay: 1 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -left-6 top-24 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3 pr-5 shadow-xl backdrop-blur sm:flex lg:-left-20"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Car className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">Votre chauffeur arrive</p>
              <p className="text-xs text-gray-500">Toyota Corolla · 3 min</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -right-4 bottom-28 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3 pr-5 shadow-xl backdrop-blur sm:flex lg:-right-12"
          >
            <CheckCircle2 className="h-9 w-9 text-coral-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Colis livré</p>
              <p className="text-xs text-gray-500">Paiement Mobile Money ✓</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

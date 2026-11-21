"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

import {
  CheckCircle,
  Send,
  MoveRight,
  Download,
  Truck,
} from "lucide-react";

// Card Component (No Change)
const Card: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => (
  // Shadow softened to shadow-lg for a less dramatic look
  <div className={`rounded-xl border bg-card text-card-foreground shadow-lg ${className}`} {...props}>
    {children}
  </div>
);

// Card Content Component (No Change)
const CardContent: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

// Les piliers technologiques affichés en effet machine à écrire
const FLAGSHIP_MODULES = [
  "de livraison",
  "du distribution intelligent",
  "de la gestion de flotte",
  "des points relais",
  "des coursiers",
  "des boutiques en ligne",
  "des paiements",
  "de l'IA & des rapports",
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

const Hero: React.FC = () => {
  const typedModule = useTypewriter(FLAGSHIP_MODULES);

  // Variantes d'entrée (No Change)
  const cardEnterVariants: Variants = {
    hidden: { opacity: 0, x: -60, y: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: 1 + delay,
        type: "spring",
        stiffness: 100,
      }
    }),
  };

  // Variantes de flottement 1 (No Change)
  const cardFloatVariants1: Variants = {
    float: {
      y: [0, 5, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: 0.5,
      }
    }
  };

  // Variantes de flottement 2 (No Change)
  const cardFloatVariants2: Variants = {
    float: {
      y: [0, -5, 0],
      rotate: [0, -1, 1, 0],
      transition: {
        duration: 9,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: 1.5,
      }
    }
  };

  return (
    <section className="relative bg-white dark:bg-gray-900 overflow-hidden py-16 sm:py-24">
      {/* Fond en dégradés doux, façon Stripe — remplace le blanc plat */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#FF2D16]/15 blur-[110px]" />
        <div className="absolute top-1/3 -left-32 h-[26rem] w-[26rem] rounded-full bg-slate-300/30 blur-[100px]" />
        <div className="absolute -bottom-24 right-1/4 h-[22rem] w-[22rem] rounded-full bg-[#FF2D16]/10 blur-[90px]" />
      </div>

      <div className="relative grid mt-10 max-w-screen-xl px-4 mx-auto lg:gap-12 xl:gap-0 lg:grid-cols-12">

        {/* ======== Texte principal et CTA (lg:col-span-7) ======== */}
        <div className="mr-auto place-self-center lg:col-span-7 pr-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight md:text-6xl xl:text-6xl dark:text-white"
          >
            L'infrastructure technologique 
            <br />
            <span className="block min-h-[1.3em] text-red-600 dark:text-slate-300">
              {typedModule}
              <span className="ml-1 inline-block h-[0.85em] w-0.75 animate-pulse bg-slate-700 align-middle dark:bg-slate-300" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl mb-8 font-light text-gray-600 lg:mb-10 md:text-xl lg:text-xl dark:text-gray-400"
          >
            Carygoo simplifie la livraison, pour les entreprises et les particuliers à travers le monde. Expédiez, suivez en temps réel et payez en toute simplicité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            {/* Boutons CTA (Couleur Soft/Neutre) */}
            <a
              href="https://play.google.com/store/apps/details?id=com.hylancompany.carygoo"
              // Changement de Red à Slate (Gris foncé, soft)
              className="inline-flex items-center justify-center w-full sm:w-56 px-6 py-3 text-lg font-semibold text-center text-white bg-slate-700 rounded-lg shadow-lg hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 transition duration-300 transform hover:scale-[1.02]"
            >
              <Download className="w-5 h-5 mr-2" />
              Google Play
            </a>

            <a
              href="https://apps.apple.com/cm/app/carygoo/id6738035989"
              className="inline-flex items-center justify-center w-full sm:w-56 px-6 py-3 text-lg font-semibold text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-slate-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]"
            >
              <Download className="w-5 h-5 mr-2" />
              Apple Store
            </a>
          </motion.div>
        </div>

        <div
          className="relative mt-16 lg:mt-0 lg:col-span-5 flex flex-col items-center justify-start lg:justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center w-full max-w-sm lg:max-w-none lg:p-10"
          >
            <div className="relative w-full max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 to-white shadow-xl">
              <svg
                viewBox="0 0 600 400"
                className="h-auto w-full"
                role="img"
                aria-label="Suivi de livraison en temps réel"
              >
                <defs>
                  <pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1.5" fill="#CBD5E1" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#heroGrid)" />

                <path
                  d="M90,300 Q300,60 500,120"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="3"
                  strokeDasharray="8 10"
                  className="animate-[cg-flow_6s_linear_infinite]"
                  opacity="0.6"
                />

                <circle cx="90" cy="300" r="9" fill="#334155" />
                <circle cx="90" cy="300" r="16" fill="none" stroke="#334155" strokeWidth="2" opacity="0.25" />

                <circle cx="500" cy="120" r="9" fill="#FF2D16" />
                <circle cx="500" cy="120" r="9" fill="#FF2D16" opacity="0.35">
                  <animate attributeName="r" values="9;26;9" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                </circle>

                <circle r="7" fill="#1E293B">
                  <animateMotion dur="3.2s" repeatCount="indefinite" path="M90,300 Q300,60 500,120" />
                </circle>
              </svg>

              <motion.div
                className="absolute left-[72%] top-[18%] flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1, 0.8] }}
                transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.82, 0.88, 0.97, 1] }}
              >
                <CheckCircle className="h-3.5 w-3.5 text-slate-700" />
                Livré
              </motion.div>
            </div>
            <motion.div
              initial="hidden"
              animate={["visible", "float"]}
              variants={{ ...cardEnterVariants, ...cardFloatVariants1 }}
              custom={0}
              className="absolute lg:-top-10 lg:-left-16 z-10 hidden lg:block w-64"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-lg rounded-xl p-4 w-full">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="w-6 h-6 text-slate-600" />
                    <h3 className="text-xl font-extrabold text-slate-700">
                      Suivi 24h/7
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Suivez l'acheminement de vos marchandises en temps réel, à chaque étape.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={["visible", "float"]}
              variants={{ ...cardEnterVariants, ...cardFloatVariants2 }}
              custom={0.2}
              className="absolute lg:-bottom-10 lg:-right-16 z-10 hidden lg:block w-64"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-lg rounded-xl p-4 w-full">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Send className="w-6 h-6 text-slate-600" />
                    <h3 className="text-xl font-extrabold text-slate-700">
                      Carygoo Express
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    Rapides, fiables et traçables en temps réel.
                  </p>
                  <a
                    href="https://carygoo.com"
                    className="inline-flex items-center mt-3 text-sm font-medium text-slate-600 hover:text-slate-700 transition duration-300"
                  >
                    Découvrez nos services
                    <MoveRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="lg:hidden flex flex-col items-center w-full max-w-sm mt-8 space-y-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardEnterVariants}
              custom={0}
              className="w-full"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-lg rounded-xl p-4 w-full">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="w-6 h-6 text-slate-600" />
                    <h3 className="text-xl font-extrabold text-slate-700">
                      Suivi 24/7
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Sachez toujours où se trouvent vos marchandises en temps réel
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardEnterVariants}
              custom={0.2}
              className="w-full"
            >
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 shadow-lg rounded-xl p-4 w-full">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Truck className="w-6 h-6 text-slate-600" />
                    <h3 className="text-xl font-extrabold text-slate-700">
                      Carygoo Express
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    Livraisons rapides, sûres et traçables à travers l'Afrique
                  </p>
                  <a
                    href="https://carygoo.com"
                    className="inline-flex items-center mt-3 text-sm font-medium text-slate-600 hover:text-slate-700 transition duration-300"
                  >
                    Explorer les services
                    <MoveRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";
import React from "react";
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

const Hero: React.FC = () => {

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
    <section className="bg-white dark:bg-gray-900 overflow-hidden py-16 sm:py-24">
      <div className="grid mt-10 max-w-screen-xl px-4 mx-auto lg:gap-12 xl:gap-0 lg:grid-cols-12">

        {/* ======== Texte principal et CTA (lg:col-span-7) ======== */}
        <div className="mr-auto place-self-center lg:col-span-7 pr-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight md:text-6xl xl:text-6xl dark:text-white"
          >
            La plateforme de <span className="text-slate-700 dark:text-slate-300">logistique</span> intelligente pour vos livraisons
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl mb-8 font-light text-gray-600 lg:mb-10 md:text-xl lg:text-xl dark:text-gray-400"
          >
            Optimisez vos livraisons, fidélisez vos clients et développez votre activité grâce à la plateforme de gestion des livraisons propulsée par l'IA de Carygoo.
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
            <img
              src="/images/hero.png"
              alt="Carygoo app preview"
              width={600}
              height={400}
              className="w-auto h-auto max-w-full"
            />
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
              className="absolute lg:-bottom-16 lg:-right-5 z-10 hidden lg:block w-64"
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

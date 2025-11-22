// components/MotionLogoCarousel.jsx

"use client";

import Image from 'next/image';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react'; // 🎯 Ajout de useState

const clientLogos = [
    { name: 'Logo DHL', path: 'https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/67e5db26da65e7c818e6f76b_kfc-logo.png', width: 120, height: 40 },
    { name: 'Logo ShivaPlus', path: 'http://shivaplus.com/wp-content/uploads/2023/07/shiva-logo__2_-removebg-preview.png', width: 90, height: 40 },
    { name: 'Logo Unilever', path: 'https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/67e355d044bf929b1b792c21_use-case-logo-7.avif', width: 140, height: 40 },
    { name: 'Logo Honeywell', path: 'https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/67e355d044bf929b1b792c45_use-case-logo-2.avif', width: 100, height: 40 },
    { name: 'Logo Maersk', path: 'https://cdn.prod.website-files.com/62428b049409c6b74b6b6636/67e5db26ac481a438edb73a1_sage-logo.png', width: 120, height: 40 },
];

const allLogos = [...clientLogos, ...clientLogos];
const DURATION = 30; // Durée de l'animation en secondes

const MotionLogoCarousel = () => {
    const xTranslation = useMotionValue(0);
    // 🎯 containerRef pointe sur la motion.div qui contient TOUS les logos
    const containerRef = useRef<HTMLDivElement>(null);

    // 🎯 Etat pour stocker la largeur réelle du contenu (en pixels)
    const [scrollDistance, setScrollDistance] = useState(0);

    // Effet 1: Calculer la distance de défilement exacte
    useEffect(() => {
        if (containerRef.current) {
            // La scrollWidth est la largeur totale (les 10 logos)
            // La distance à parcourir est la MOITIÉ de cette largeur totale (les 5 premiers logos)
            const width = containerRef.current.scrollWidth / 2;
            setScrollDistance(width);
        }
    }, []); // S'exécute une seule fois au montage pour obtenir la taille

    // Effet 2: Démarrer l'animation avec la distance calculée
    useEffect(() => {
        // Ne lance l'animation que si la distance a été calculée (scrollDistance > 0)
        if (scrollDistance === 0) return;

        // Animer de 0 à la largeur réelle du contenu, en négatif (-width)
        const controls = animate(xTranslation, -scrollDistance, {
            ease: "linear",
            duration: DURATION,
            repeat: Infinity,
            repeatType: "loop",
            // Nous utilisons "px" car scrollDistance est en pixels.
            type: "tween",
        });

        return controls.stop;
    }, [xTranslation, scrollDistance]); // 🎯 Relancer quand scrollDistance change

    return (
        <section className="bg-gray-50 dark:bg-gray-950 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Conteneur du Marquee */}
                <div className="relative overflow-hidden h-10 group">

                    {/* Ombres de fondu (Gauche et Droite) */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent"></div>

                    <motion.div
                        ref={containerRef}
                        className="flex absolute whitespace-nowrap"
                        // 🎯 CRITIQUE : La largeur est gérée par le contenu.
                        // On n'utilise PLUS width: '200%' car le calcul est fait en pixels.
                        style={{ x: xTranslation }}
                    >
                        {allLogos.map((logo, index) => (
                            <div
                                key={index}
                                // CRITIQUE : min-w pour que le scrollWidth soit calculable
                                className="flex items-center justify-center min-w-[200px] sm:min-w-[250px] px-8"
                            >
                                <div className="h-10 flex items-center 
                                        grayscale opacity-40 hover:opacity-100 hover:grayscale-0
                                        transition-all duration-500 cursor-pointer">
                                    <Image
                                        src={logo.path}
                                        alt={logo.name}
                                        width={logo.width}
                                        height={logo.height}
                                        style={{ height: '40px', width: 'auto' }}
                                        priority={true}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MotionLogoCarousel;
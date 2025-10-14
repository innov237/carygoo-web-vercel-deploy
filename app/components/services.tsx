"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION = 5000; // 5 secondes

interface Service {
    title: string;
    description: string;
}

const SERVICES: Service[] = [
    { title: "E-commerce", description: "Solutions logistiques complètes et intégrées pour votre boutique en ligne." },
    { title: "Express Logistics", description: "Livraison ultra-rapide et sécurisée pour les envois urgents, disponible 24/7." },
    { title: "Warehousing", description: "Stockage flexible et gestion optimisée des inventaires dans des entrepôts modernes." },
    { title: "Freight Forwarding", description: "Transport international sans effort (maritime, aérien, terrestre)." },
    { title: "Industrial Solutions", description: "Logistique sur mesure pour les projets industriels complexes." },
    { title: "Cold Chain Logistics", description: "Transport à température contrôlée pour produits sensibles." },
    { title: "Customs Clearance", description: "Dédouanement rapide et conforme pour vos envois internationaux." },
    { title: "Assurance Marchandises", description: "Protection complète contre les pertes ou dommages." },
    { title: "Cross-Docking", description: "Transbordement pour une distribution rapide et rentable." },
    { title: "Optimisation de Flotte", description: "Algorithmes IA pour améliorer les itinéraires de livraison." },
];

const ServiceCoverage: React.FC = () => {
    const CARDS_PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const totalPages = Math.ceil(SERVICES.length / CARDS_PER_PAGE);

    // Auto progression avec pause
    useEffect(() => {
        if (totalPages <= 1) return;

        const interval = 100;
        const steps = SLIDE_DURATION / interval;
        let count = 0;

        const timer = setInterval(() => {
            if (!paused) {
                count++;
                setProgress((count / steps) * 100);
                if (count >= steps) {
                    setCurrentPage(prev => (prev + 1) % totalPages);
                    count = 0;
                    setProgress(0);
                }
            }
        }, interval);

        return () => clearInterval(timer);
    }, [paused, totalPages]);

    const startIndex = currentPage * CARDS_PER_PAGE;
    const currentServices = SERVICES.slice(startIndex, startIndex + CARDS_PER_PAGE);

    // Navigation manuelle
    const goToPage = (page: number) => {
        setCurrentPage(page);
        setProgress(0);
    };
    const nextPage = () => goToPage((currentPage + 1) % totalPages);
    const prevPage = () => goToPage((currentPage - 1 + totalPages) % totalPages);

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-red-50 via-white to-gray-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Conteneur principal responsive */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                    {/* Titre et description */}
                    <div className="lg:w-2/4 text-center lg:text-left mb-8 lg:mb-0">
                        <p className="text-sm font-medium uppercase text-red-500 tracking-wider mb-5">
                            Nos Services
                        </p>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight sm:text-5xl">
                            Couverture Logistique Complète
                        </h2>
                        <p className="text-lg text-gray-600 max-w-md">
                            De l'e-commerce à la logistique du froid, nous assurons la fiabilité et la performance à chaque étape.
                        </p>
                    </div>

                    {/* Slider cartes */}
                    <div
                        className="lg:w-2/4 relative"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* Barres de progression */}
                        {totalPages > 1 && (
                            <div className="flex justify-center lg:justify-start mb-10 space-x-3">
                                {Array.from({ length: totalPages }).map((_, i) => {
                                    let fill = 0;
                                    if (i < currentPage) fill = 100;
                                    else if (i === currentPage) fill = progress;
                                    else fill = 0;

                                    return (
                                        <div
                                            key={i}
                                            className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                                            onClick={() => goToPage(i)}
                                        >
                                            <motion.div
                                                className="h-1 bg-red-500"
                                                animate={{ width: `${fill}%` }}
                                                transition={{ duration: 0.2, ease: "linear" }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
                            >
                                {currentServices.map((service, index) => (
                                    <ServiceCard key={index} service={service} index={index} />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Contrôles de navigation */}
                        {totalPages > 1 && (
                            <div className="flex justify-end mt-10 space-x-6">
                                <SliderButton onClick={prevPage} icon={<ChevronLeft size={16} />} />
                                <div className="text-sm font-medium text-gray-600 self-center">
                                    {currentPage + 1} / {totalPages}
                                </div>
                                <SliderButton onClick={nextPage} icon={<ChevronRight size={16} />} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Carte de service
const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
    const rotation = [-1.5, 1.2, -0.8, 1.8][index % 4];

    return (
        <motion.div
            whileHover={{
                rotate: 0,
                y: -8,
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ rotate: rotation }}
            className="p-6 h-80 bg-white border border-gray-100 rounded-2xl shadow-sm 
                 hover:shadow-lg transition-all duration-300 group relative"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-50 via-white to-transparent opacity-70 rounded-2xl pointer-events-none" />
            <div className="flex items-center mb-4 relative z-10">
                <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed relative z-10">
                {service.description}
            </p>
        </motion.div>
    );
};

// Boutons navigation
const SliderButton: React.FC<{ onClick: () => void; icon: React.ReactNode }> = ({ onClick, icon }) => (
    <button
        onClick={onClick}
        className={`
      flex items-center justify-center
      h-10 w-10 rounded-full
      bg-white text-red-600 border border-red-300
      hover:bg-red-50 hover:border-red-400 active:bg-red-100
      shadow-sm transition duration-300
    `}
    >
        {icon}
    </button>
);

export default ServiceCoverage;

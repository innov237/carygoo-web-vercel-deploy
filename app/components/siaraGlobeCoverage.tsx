"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface CoverageStat {
    value: string;
    label: string;
    description: string;
}

const COVERAGE_STATS: CoverageStat[] = [
    {
        value: "100+",
        label: "Pays représentés",
        description: "Des expéditeurs et destinataires connectés partout dans le monde.",
    },
    {
        value: "20m+",
        label: "Commandes livrées",
        description: "Traitées et suivies de bout en bout sur la plateforme Siara.",
    },
    {
        value: "4k+",
        label: "Entreprises actives",
        description: "Restaurants, boutiques, pharmacies et entreprises de BTP.",
    },
    {
        value: "100+",
        label: "Partenaires intégrés",
        description: "Transporteurs, points relais et coursiers connectés au hub.",
    },
];

// Positions approximatives (en %) de quelques marchés actifs, répartis sur tout le globe
const ACTIVE_MARKETS = [
    { cx: 30, cy: 42 },
    { cx: 46, cy: 62 },
    { cx: 62, cy: 34 },
    { cx: 68, cy: 60 },
    { cx: 40, cy: 74 },
];

// Bruit déterministe (aucun Math.random) — deux octaves combinées pour éviter
// les artefacts symétriques et suggérer des masses continentales organiques.
function pseudoNoise(x: number, y: number) {
    const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return s - Math.floor(s);
}

function landNoise(x: number, y: number) {
    const big = pseudoNoise(Math.floor(x / 55), Math.floor(y / 55) + 19);
    const mid = pseudoNoise(Math.floor(x / 21) + 31, Math.floor(y / 21) + 7);
    return big * 0.65 + mid * 0.35;
}

// Génère une "tuile" de points continentaux d'une largeur = diamètre, pensée
// pour être dupliquée horizontalement et défiler sans coupure (effet rotation).
function useGlobeDotTile(radius: number, spacing: number) {
    return useMemo(() => {
        const diameter = radius * 2;
        const dots: { x: number; y: number; opacity: number }[] = [];
        for (let y = -radius; y <= radius; y += spacing) {
            for (let x = 0; x <= diameter; x += spacing) {
                const dist = Math.hypot(x - radius, y);
                if (dist > radius - 4) continue;
                const n = landNoise(x, y);
                if (n < 0.44) continue;
                const edgeFade = 1 - dist / radius;
                dots.push({ x, y, opacity: 0.3 + edgeFade * 0.7 });
            }
        }
        return { dots, diameter };
    }, [radius, spacing]);
}

// Trace elliptique convertie en chemin, pour que les comètes puissent le suivre via <mpath>
function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
    return `M ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy}`;
}

interface OrbitCometProps {
    id: string;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    rotate: number;
    color: string;
    cycleDur: number;
    begin: number;
}

// Une orbite façon "étoile filante" : trace fine statique + comète (tête + traîne
// qui s'estompe) qui file rapidement le long du tracé, puis disparaît et repart.
function OrbitComet({ id, cx, cy, rx, ry, rotate, color, cycleDur, begin }: OrbitCometProps) {
    const d = ellipsePath(cx, cy, rx, ry);
    const tail = [0, 0.09, 0.18, 0.27];
    return (
        <g style={{ transformOrigin: `${cx}px ${cy}px` }} transform={`rotate(${rotate} ${cx} ${cy})`}>
            <path id={id} d={d} fill="none" stroke={color} strokeWidth="1" opacity="0.15" />
            {tail.map((delay, i) => (
                <circle key={i} r={5 - i * 1.1} fill={color}>
                    <animateMotion
                        dur={`${cycleDur}s`}
                        begin={`${begin + delay}s`}
                        repeatCount="indefinite"
                        keyPoints="0;0;1;1"
                        keyTimes="0;0.01;0.22;1"
                        calcMode="linear"
                    >
                        <mpath href={`#${id}`} />
                    </animateMotion>
                    <animate
                        attributeName="opacity"
                        values={`0;${1 - i * 0.22};${1 - i * 0.22};0;0`}
                        keyTimes="0;0.01;0.2;0.22;1"
                        dur={`${cycleDur}s`}
                        begin={`${begin + delay}s`}
                        repeatCount="indefinite"
                    />
                </circle>
            ))}
        </g>
    );
}

export default function SiaraGlobeCoverage() {
    const size = 500;
    const center = size / 2;
    const radius = 210;
    const { dots, diameter } = useGlobeDotTile(radius, 11);

    return (
        <section className="bg-white py-20 md:py-28 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Colonne texte + stats */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 text-balance">
                        Notre couverture, <span className="text-[#FF296C]">à l&apos;échelle du monde</span>.
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-md">
                        Un seul hub qui relie des milliers d&apos;entreprises et de transporteurs, partout où vos livraisons doivent aller.
                    </p>

                    <div className="relative pl-6">
                        <div className="absolute left-[3px] top-2 bottom-2 w-px border-l-2 border-dotted border-gray-300" />
                        <div className="space-y-10">
                            {COVERAGE_STATS.map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative"
                                >
                                    <span className="absolute -left-6 top-1 h-4 w-0.75 rounded-full bg-[#FF296C]" />
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
                                        <span className="text-base font-semibold text-gray-700">{stat.label}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Colonne globe animé */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                    className="relative mx-auto w-full max-w-md aspect-square"
                >
                    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full overflow-visible">
                        <defs>
                            <clipPath id="globeClip">
                                <circle cx={center} cy={center} r={radius} />
                            </clipPath>
                            <radialGradient id="globeShade" cx="35%" cy="30%" r="75%">
                                <stop offset="0%" stopColor="#1E293B" />
                                <stop offset="100%" stopColor="#05070F" />
                            </radialGradient>
                        </defs>

                        {/* Sphère */}
                        <circle cx={center} cy={center} r={radius} fill="url(#globeShade)" />

                        {/* Points formant les masses continentales — tuile dupliquée qui défile en boucle pour simuler la rotation du globe */}
                        <g clipPath="url(#globeClip)">
                            <g transform={`translate(${center - radius}, ${center})`}>
                                <g className="animate-[globe-scroll_20s_linear_infinite]">
                                    {dots.map((dot, i) => (
                                        <circle key={`a-${i}`} cx={dot.x} cy={dot.y} r={1.6} fill="#CBD5E1" opacity={dot.opacity} />
                                    ))}
                                    {dots.map((dot, i) => (
                                        <circle key={`b-${i}`} cx={dot.x + diameter} cy={dot.y} r={1.6} fill="#CBD5E1" opacity={dot.opacity} />
                                    ))}
                                </g>
                            </g>
                        </g>

                        {/* Contour de la sphère */}
                        <circle cx={center} cy={center} r={radius} fill="none" stroke="#334155" strokeWidth="1.5" opacity="0.6" />

                        {/* Orbites façon étoiles filantes : traîne fine qui file autour du globe puis disparaît */}
                        <OrbitComet id="orbit-a" cx={center} cy={center} rx={radius * 0.98} ry={radius * 0.34} rotate={-20} color="#FF296C" cycleDur={6} begin={0} />
                        <OrbitComet id="orbit-b" cx={center} cy={center} rx={radius * 0.4} ry={radius * 1.02} rotate={35} color="#94A3B8" cycleDur={7} begin={2.3} />
                        <OrbitComet id="orbit-c" cx={center} cy={center} rx={radius * 0.72} ry={radius * 0.72} rotate={70} color="#FF296C" cycleDur={8} begin={4.6} />

                        {/* Marchés actifs qui pulsent */}
                        {ACTIVE_MARKETS.map((m, i) => {
                            const x = center - radius + (m.cx / 100) * radius * 2;
                            const y = center - radius + (m.cy / 100) * radius * 2;
                            return (
                                <g key={i}>
                                    <circle cx={x} cy={y} r="3.5" fill="#FF296C" />
                                    <circle cx={x} cy={y} r="3.5" fill="#FF296C" opacity="0.4">
                                        <animate attributeName="r" values="3.5;16;3.5" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
                                    </circle>
                                </g>
                            );
                        })}
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}

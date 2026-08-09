"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

// Source unique pour le menu desktop ET mobile — évite la duplication des
// liens (auparavant écrits deux fois, avec risque de divergence).
const NAV_GROUPS: NavGroup[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Solutions",
    children: [
      { label: "Gestion de flotte & dispatch", href: "/partners" },
      { label: "Points Relais & Colis", href: "/relay-points" },
      { label: "Boutiques & E-commerce", href: "/shops" },
      { label: "API pour développeurs", href: "/docs/partner-api" },
    ],
  },
  { label: "Tarifs", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const HeaderWhite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenMobileGroup(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDesktopGroup(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDesktopGroup(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    // Fixed Header sur fond blanc
    <header className="fixed z-50 w-full">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">

          {/* Logo et Nom de la Marque */}
          <a href="/" className="flex items-center group">
            <div className="p-0.5 mr-3">
              <Image
                src="/images/logo.png"
                alt="Carygoo Logo"
                width={36}
                height={36}
                className="h-7 w-7 rounded-full sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="self-center text-xl font-bold whitespace-nowrap text-gray-900 font-display">Carygoo</span>
          </a>

          {/* Boutons d'Action (Desktop) */}
          <div className="flex items-center lg:order-2 space-x-3">

            {/* Bouton CTA - Couleur d'accentuation Rouge */}
            <a href="/contact" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 transition-all duration-200 hover:shadow-md hover:shadow-red-600/20">
              Nous contacter
            </a>

            {/* Bouton de bascule du menu mobile (Affiché uniquement sur petit écran) */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>

          {/* Menu de Navigation (Desktop) */}
          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" ref={dropdownRef}>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:items-center lg:space-x-1 lg:mt-0">
              {NAV_GROUPS.map((group) => (
                <li key={group.label} className="relative">
                  {group.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenDesktopGroup(openDesktopGroup === group.label ? null : group.label)}
                        className="flex items-center gap-1 py-2 px-3 text-gray-600 hover:text-red-600 transition-colors duration-200 rounded-lg"
                        aria-expanded={openDesktopGroup === group.label}
                      >
                        {group.label}
                        <ChevronDown
                          size={15}
                          className={`transition-transform duration-200 ${openDesktopGroup === group.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDesktopGroup === group.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-2"
                          >
                            {group.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpenDesktopGroup(null)}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={group.href}
                      className="block py-2 px-3 text-gray-600 hover:text-red-600 transition-colors duration-200 rounded-lg"
                    >
                      {group.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Menu Mobile (S'ouvre depuis la droite - Fond Blanc) */}
        <div
          className={`
            fixed top-0 right-0 h-screen w-full bg-white lg:hidden transition-transform duration-300 ease-in-out z-40
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
            >
              <X className="w-8 h-8 text-gray-900" />
            </button>
          </div>

          <ul className="flex flex-col p-4 space-y-1">
            {NAV_GROUPS.map((group) => (
              <li key={group.label}>
                {group.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(openMobileGroup === group.label ? null : group.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-2xl font-semibold text-gray-900 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {group.label}
                      <ChevronDown
                        size={22}
                        className={`transition-transform duration-200 ${openMobileGroup === group.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openMobileGroup === group.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4"
                        >
                          {group.children.map((child) => (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                className="block px-4 py-2.5 text-lg text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={toggleMenu}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={group.href}
                    className="block px-4 py-3 text-2xl font-semibold text-gray-900 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={toggleMenu}
                  >
                    {group.label}
                  </a>
                )}
              </li>
            ))}
            <li className="pt-6">
              <a href="/contact" className="block w-full text-center text-white bg-red-600 hover:bg-red-700 font-bold rounded-lg text-lg px-4 py-3 focus:ring-4 focus:ring-red-300 transition-colors" onClick={toggleMenu}>
                Nous contacter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderWhite;

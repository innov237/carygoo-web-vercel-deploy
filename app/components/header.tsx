"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

const HeaderWhite: React.FC = () => {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Bascule l'état du menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Fixed Header sur fond blanc
    <header className="fixed z-50 w-full">
      <nav className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          
          {/* Logo et Nom de la Marque */}
          <a href="#" className="flex items-center">
            {/* L'icône est toujours bien visible avec un fond rouge */}
            <div className="p-0.5 mr-3">
              <Image
                src="/images/logo.png" 
                alt="Carygoo Logo"
                width={36}
                height={36}
                className="h-7 w-7 rounded-full sm:h-8 sm:w-8"
              />
            </div>
            <span className="self-center text-xl font-extrabold whitespace-nowrap text-gray-900">Carygoo</span>
          </a>
          
          {/* Boutons d'Action (Desktop) */}
          <div className="flex items-center lg:order-2 space-x-3">
            
            {/* Bouton CTA - Couleur d'accentuation Rouge */}
            <a href="#" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5">
              Démarrer l'Essai
            </a>

            {/* Bouton de bascule du menu mobile (Affiché uniquement sur petit écran) */}
            <button 
              onClick={toggleMenu}
              type="button" 
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icônes noires sur fond blanc */}
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
          
          {/* Menu de Navigation (Desktop) */}
          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                {/* Liens Noirs, Rouge au survol */}
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 hover:text-red-600 lg:hover:text-red-600 lg:p-0 transition-colors duration-200" aria-current="page">Accueil</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-600 hover:text-red-600 lg:hover:text-red-600 lg:p-0 transition-colors duration-200">Fonctionnalités</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-600 hover:text-red-600 lg:hover:text-red-600 lg:p-0 transition-colors duration-200">Tarifs</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-600 hover:text-red-600 lg:hover:text-red-600 lg:p-0 transition-colors duration-200">Blog</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-gray-600 hover:text-red-600 lg:hover:text-red-600 lg:p-0 transition-colors duration-200">Contact</a>
              </li>
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
            {/* Bouton de fermeture */}
             <button 
              onClick={toggleMenu}
              type="button" 
              className="p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
            >
              <X className="w-8 h-8 text-gray-900" />
            </button>
          </div>

          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <a href="#" className="block px-4 py-3 text-2xl font-semibold text-red-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleMenu}>Accueil</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-2xl font-semibold text-gray-900 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleMenu}>Fonctionnalités</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-2xl font-semibold text-gray-900 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleMenu}>Tarifs</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-2xl font-semibold text-gray-900 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleMenu}>Blog</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-2xl font-semibold text-gray-900 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={toggleMenu}>Contact</a>
            </li>
            <li className="pt-6">
                 <a href="#" className="block w-full text-center text-white bg-red-600 hover:bg-red-700 font-bold rounded-lg text-lg px-4 py-3 focus:ring-4 focus:ring-red-300 transition-colors" onClick={toggleMenu}>
                    Démarrer l'Essai Gratuit
                </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderWhite;
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Car,
  Package,
  House,
  UtensilsCrossed,
  ShoppingBasket,
  Truck,
  MapPin,
  Store,
  Code2,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  href?: string;
  // Méga-menu : titre de colonne + liens avec icône et description.
  menu?: { title: string; items: NavItem[]; footer?: { label: string; href: string } };
}

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.hylancompany.carygoo";
const APP_STORE_URL = "https://apps.apple.com/cm/app/carygoo/id6738035989";

// Source unique pour le menu desktop ET mobile.
const NAV_GROUPS: NavGroup[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Services",
    menu: {
      title: "La super app Siara",
      items: [
        { label: "VTC", href: "/#services", description: "Un chauffeur en quelques minutes", icon: Car },
        { label: "Livraison de colis", href: "/#services", description: "Envoyez et suivez en temps réel", icon: Package },
        { label: "Services à domicile", href: "/#services", description: "Des pros vérifiés chez vous", icon: House },
        { label: "Restaurants", href: "/#services", description: "Vos plats préférés livrés chauds", icon: UtensilsCrossed },
        { label: "Supermarché", href: "/#services", description: "Vos courses livrées le jour même", icon: ShoppingBasket },
      ],
      footer: { label: "Télécharger l'application", href: PLAY_STORE_URL },
    },
  },
  {
    label: "Entreprises",
    menu: {
      title: "Siara pour les pros",
      items: [
        { label: "Flotte & dispatch", href: "/partners", description: "Pilotez chauffeurs et livreurs", icon: Truck },
        { label: "Points relais", href: "/relay-points", description: "Réseau de dépôt et retrait de colis", icon: MapPin },
        { label: "Boutiques & e-commerce", href: "/shops", description: "Vendez et livrez en ligne", icon: Store },
        { label: "API développeurs", href: "/docs/partner-api", description: "Intégrez Siara à votre système", icon: Code2 },
      ],
      footer: { label: "Parler à un expert", href: "/contact" },
    },
  },
  { label: "Tarifs", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const isExternal = (href: string) => href.startsWith("http");

function NavAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} onClick={onClick} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (group: NavGroup) => {
    if (group.href) return group.href === "/" ? pathname === "/" || pathname === "/home" : pathname.startsWith(group.href);
    return group.menu?.items.some((i) => !i.href.startsWith("/#") && pathname.startsWith(i.href)) ?? false;
  };

  // Fermeture des menus au changement de page.
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDesktopGroup(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenDesktopGroup(null);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopGroup(null);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloque le scroll de la page quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Ouverture au survol (desktop) avec un petit délai de fermeture
  // pour laisser le temps de descendre la souris dans le panneau.
  const openGroup = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDesktopGroup(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDesktopGroup(null), 140);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <div
        ref={navRef}
        className={`mx-auto max-w-screen-xl transition-all duration-300 ${isScrolled ? "mt-2" : "mt-3 sm:mt-4"}`}
      >
        <nav
          className={`relative flex items-center justify-between rounded-2xl border px-3 sm:px-5 transition-all duration-300 ${
            isScrolled
              ? "h-14 border-gray-200/80 bg-white/85 shadow-lg shadow-brand-950/5 backdrop-blur-xl"
              : "h-16 border-transparent bg-white/60 backdrop-blur-md"
          }`}
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-brand-500">
            <Image
              src="/images/siara-logo.png"
              alt="Siara"
              width={1061}
              height={354}
              priority
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-7" : "h-8"}`}
            />
          </Link>

          {/* Liens (desktop) */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map((group) => {
              const active = isActive(group);
              const base = `relative flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
                active ? "text-brand-700" : "text-gray-600 hover:text-gray-900"
              }`;
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={group.menu ? () => openGroup(group.label) : undefined}
                  onMouseLeave={group.menu ? scheduleClose : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-brand-50"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {group.menu ? (
                    <button
                      type="button"
                      className={base}
                      aria-expanded={openDesktopGroup === group.label}
                      aria-haspopup="true"
                      onClick={() => setOpenDesktopGroup(openDesktopGroup === group.label ? null : group.label)}
                    >
                      <span className="relative">{group.label}</span>
                      <ChevronDown
                        size={15}
                        className={`relative transition-transform duration-200 ${openDesktopGroup === group.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link href={group.href!} className={base} aria-current={active ? "page" : undefined}>
                      <span className="relative">{group.label}</span>
                    </Link>
                  )}

                  <AnimatePresence>
                    {group.menu && openDesktopGroup === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-brand-950/10">
                          <p className="px-5 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {group.menu.title}
                          </p>
                          <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                            {group.menu.items.map((item) => (
                              <NavAnchor
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpenDesktopGroup(null)}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                                  <item.icon className="h-5 w-5" />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-gray-900">{item.label}</span>
                                  <span className="block text-xs leading-snug text-gray-500">{item.description}</span>
                                </span>
                              </NavAnchor>
                            ))}
                          </div>
                          {group.menu.footer && (
                            <NavAnchor
                              href={group.menu.footer.href}
                              onClick={() => setOpenDesktopGroup(null)}
                              className="group flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                            >
                              {group.menu.footer.label}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </NavAnchor>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden md:inline-flex rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Espace pro
            </Link>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30"
            >
              Télécharger l&apos;app
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2.5 text-gray-900 hover:bg-gray-100 lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-16 items-center justify-between px-5 border-b border-gray-100">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image src="/images/siara-logo.png" alt="Siara" width={1061} height={354} className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                className="rounded-full p-2.5 text-gray-900 hover:bg-gray-100"
                aria-label="Fermer le menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.ul
              className="flex-1 overflow-y-auto px-3 py-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            >
              {NAV_GROUPS.map((group) => (
                <motion.li
                  key={group.label}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="border-b border-gray-100 last:border-0"
                >
                  {group.menu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(openMobileGroup === group.label ? null : group.label)}
                        className="flex w-full items-center justify-between px-3 py-4 text-xl font-semibold text-gray-900"
                        aria-expanded={openMobileGroup === group.label}
                      >
                        {group.label}
                        <ChevronDown
                          size={22}
                          className={`text-gray-400 transition-transform duration-200 ${openMobileGroup === group.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openMobileGroup === group.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-1 pb-3">
                              {group.menu.items.map((item) => (
                                <NavAnchor
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-50"
                                >
                                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                    <item.icon className="h-[18px] w-[18px]" />
                                  </span>
                                  <span className="text-base font-medium text-gray-800">{item.label}</span>
                                </NavAnchor>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={group.href!}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-4 text-xl font-semibold ${isActive(group) ? "text-brand-600" : "text-gray-900"}`}
                    >
                      {group.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            <div className="space-y-3 border-t border-gray-100 p-5 pb-8">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Google Play
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  App Store
                </a>
              </div>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-800"
              >
                Espace pro · Nous contacter
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

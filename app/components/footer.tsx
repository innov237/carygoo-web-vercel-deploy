import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.hylancompany.carygoo";
const APP_STORE_URL = "https://apps.apple.com/cm/app/carygoo/id6738035989";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "VTC", href: "/#services" },
      { label: "Livraison de colis", href: "/#services" },
      { label: "Services à domicile", href: "/#services" },
      { label: "Restaurants", href: "/#services" },
      { label: "Supermarché", href: "/#services" },
    ],
  },
  {
    title: "Entreprises",
    links: [
      { label: "Flotte & dispatch", href: "/partners" },
      { label: "Points relais", href: "/relay-points" },
      { label: "Boutiques & e-commerce", href: "/shops" },
      { label: "API développeurs", href: "/docs/partner-api" },
      { label: "Tarifs", href: "/pricing" },
    ],
  },
  {
    title: "Aide & légal",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Politique de confidentialité", href: "/privacy" },
      { label: "Suppression de compte", href: "/account-deletion-request" },
    ],
  },
];

// Pied de page sur fond violet nuit (charte Siara), accents rose.
const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100/70">
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-600/30 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-screen-xl px-4 pt-16 pb-10">
        {/* Bandeau d'appel à télécharger */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-linear-to-r from-brand-600 to-brand-700 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Tout votre quotidien, dans Siara.</h2>
            <p className="mt-2 text-brand-100/80">Téléchargez l&apos;application gratuitement.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Google Play
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              App Store
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/siara-logo-white.png" className="h-9 w-auto" alt="Siara" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              La super app du quotidien : VTC, livraison, services à domicile, restaurants et supermarché.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-coral-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} Siara. Tous droits réservés.</p>
          <Link href="/contact" className="group inline-flex items-center gap-1 hover:text-coral-400">
            Devenir partenaire
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

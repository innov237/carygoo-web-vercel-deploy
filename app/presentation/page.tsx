"use client";

import Script from "next/script";
import { DECK_SECTIONS_HTML } from "./deck-content";

// La présentation prend tout le viewport (le composant deck-stage est en
// position:fixed;inset:0) : on masque le header/footer du site pendant que
// cette page est montée plutôt que de sortir cette route du layout racine.
const HIDE_CHROME_CSS = `
  header, footer { display: none !important; }
  html, body { background: #101418; }
  deck-stage:not(:defined) { visibility: hidden; }
`;

const DECK_HTML = `<deck-stage width="1920" height="1080">${DECK_SECTIONS_HTML}</deck-stage>`;

export default function PresentationPage() {
  return (
    <>
      <style>{HIDE_CHROME_CSS}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div dangerouslySetInnerHTML={{ __html: DECK_HTML }} />
      <Script src="/presentation/deck-stage.js" strategy="afterInteractive" />
    </>
  );
}

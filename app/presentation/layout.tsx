import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carygoo — Présentation commerciale",
  description:
    "Présentation commerciale Carygoo : la plateforme de logistique intelligente pour vos livraisons — flotte, dispatch, boutiques, points relais, API et paiements.",
  robots: { index: false, follow: false },
};

export default function PresentationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

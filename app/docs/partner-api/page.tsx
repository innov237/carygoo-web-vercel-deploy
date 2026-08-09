import type { Metadata } from "next";
import { KeyRound, Truck, MapPin, MapPinned, Webhook, Coins, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "API Partenaire | Carygoo",
  description:
    "Documentation développeur de l'API Partenaire Carygoo : authentification, création de livraisons, attribution automatique du livreur, webhooks et facturation.",
};

const NAV = [
  { href: "#auth", label: "1. Authentification" },
  { href: "#vehicle-types", label: "2. Types de véhicule" },
  { href: "#places", label: "3. Recherche d'adresse" },
  { href: "#create", label: "4. Créer une livraison" },
  { href: "#matching", label: "5. Attribution du livreur" },
  { href: "#track", label: "6. Suivre / annuler" },
  { href: "#webhooks", label: "7. Webhooks" },
  { href: "#billing", label: "8. Portefeuille API" },
  { href: "#currency", label: "9. Devise" },
];

interface FeeBreakdown {
  google: number;
  infra: number;
  margin: number;
  total: number;
}

async function getBillingRates(): Promise<{ delivery_creation: FeeBreakdown; place_lookup: FeeBreakdown } | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/api-billing-rates`, {
      next: { revalidate: 300 },
    });
    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-gray-950 text-gray-100 rounded-xl p-5 overflow-x-auto text-[13px] leading-relaxed font-mono mb-6 border border-gray-800">
      <code>{children}</code>
    </pre>
  );
}

function K({ children }: { children: React.ReactNode }) {
  return <span className="text-rose-400">{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
  return <span className="text-emerald-400">{children}</span>;
}
function C({ children }: { children: React.ReactNode }) {
  return <span className="text-gray-500 italic">{children}</span>;
}

function Endpoint({ method, path }: { method: "GET" | "POST"; path: string }) {
  return (
    <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2 mb-5 shadow-sm">
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded ${
          method === "GET" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
        }`}
      >
        {method}
      </span>
      <span className="font-mono text-sm text-gray-800">{path}</span>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-red-50 text-red-700 rounded px-1.5 py-0.5 text-[0.87em] font-mono">
      {children}
    </code>
  );
}

export default async function PartnerApiDocsPage() {
  const billingRates = await getBillingRates();

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-20">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-14">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-sm font-semibold text-red-600 tracking-wide uppercase mb-3">
            API Partenaire · Référence v1
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl leading-tight">
            Créez des livraisons directement depuis votre système
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Envoyez un point de retrait et une destination : Carygoo calcule le prix à partir de la
            distance réelle, attribue un livreur automatiquement, et vous tient informé en temps réel
            par webhook.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto flex px-4">
        {/* Sidebar (desktop) */}
        <nav className="hidden lg:block w-56 shrink-0 sticky top-24 self-start py-12 pr-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Sommaire
          </p>
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block text-sm text-gray-600 hover:text-red-600 py-1.5 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile sommaire (no JS needed) */}
        <details className="lg:hidden w-full mt-6 mb-2 border border-gray-200 rounded-lg">
          <summary className="px-4 py-3 text-sm font-semibold cursor-pointer">Sommaire</summary>
          <ul className="px-4 pb-4 space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="block text-sm text-gray-600 hover:text-red-600 py-1">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </details>

        {/* Content */}
        <main className="flex-1 min-w-0 py-12 lg:pl-10 lg:border-l lg:border-gray-100 max-w-2xl">
          <section id="auth" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">Authentification</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Chaque requête vers <InlineCode>partner-api/v1/*</InlineCode> s&apos;authentifie avec une
              paire clé/secret propre à votre compte.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-2 pr-4 font-semibold">Header</th>
                    <th className="py-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-4">
                      <InlineCode>X-Api-Key</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">
                      Votre clé publique — <InlineCode>pk_live_...</InlineCode>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      <InlineCode>X-Api-Secret</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">
                      Votre secret — ne l&apos;exposez jamais côté client ou mobile
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 mb-6">
              Ces identifiants se génèrent depuis votre tableau de bord Carygoo, section{" "}
              <strong>Intégration API</strong>. Le secret n&apos;est affiché qu&apos;une seule fois, au
              moment de la génération — Carygoo ne le stocke jamais en clair et ne peut pas vous le
              redonner.
            </p>

            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
              <p className="font-semibold text-red-700 mb-1">Identifiants invalides</p>
              <p className="text-sm text-red-700/80">
                Une requête sans ces headers, ou avec une clé révoquée, reçoit une réponse{" "}
                <InlineCode>401</InlineCode> :
              </p>
            </div>

            <CodeBlock>
              <C>HTTP/1.1 401 Unauthorized</C>
              {"\n"}
              {"{"}
              {"\n  "}
              <K>&quot;error&quot;</K>: {"{"}
              {"\n    "}
              <K>&quot;code&quot;</K>: <S>&quot;invalid_api_credentials&quot;</S>,
              {"\n    "}
              <K>&quot;message&quot;</K>: <S>&quot;Clé API ou secret invalide.&quot;</S>
              {"\n  }"}
              {"\n}"}
            </CodeBlock>

            <p className="text-gray-600">
              Limite de débit : <strong>120 requêtes/minute</strong> par clé. Au-delà, réponse{" "}
              <InlineCode>429 Too Many Requests</InlineCode>.
            </p>
          </section>

          <section id="vehicle-types" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">Types de véhicule</h2>
            </div>
            <Endpoint method="GET" path="/partner-api/v1/vehicle-types" />
            <p className="text-gray-600 mb-6">
              Chaque type porte sa propre grille tarifaire, non exposée ici — le prix final est
              toujours calculé par Carygoo à la création de la livraison.
            </p>
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;vehicle_types&quot;</K>: [
              {"\n    "}
              {"{"} <K>&quot;id&quot;</K>: <S>1</S>, <K>&quot;libelle&quot;</K>:{" "}
              <S>&quot;Moto&quot;</S>, <K>&quot;description&quot;</K>:{" "}
              <S>&quot;Petits colis, documents&quot;</S> {"}"},
              {"\n    "}
              {"{"} <K>&quot;id&quot;</K>: <S>2</S>, <K>&quot;libelle&quot;</K>:{" "}
              <S>&quot;Voiture&quot;</S>, <K>&quot;description&quot;</K>:{" "}
              <S>&quot;Colis moyens&quot;</S> {"}"}
              {"\n  ]"}
              {"\n}"}
            </CodeBlock>
          </section>

          <section id="places" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">
                Recherche d&apos;adresse <span className="text-base font-medium text-gray-400">(optionnel)</span>
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Pas besoin de gérer votre propre clé Google Maps : Carygoo propose, <strong>par défaut</strong>, un
              proxy vers Google Place Autocomplete. Facultatif — vous pouvez continuer à résoudre vos adresses de
              votre côté et envoyer directement des coordonnées à la création de livraison.
            </p>

            <Endpoint method="GET" path="/partner-api/v1/places/autocomplete?input=...&session_token=..." />
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;suggestions&quot;</K>: [
              {"\n    "}
              {"{"} <K>&quot;description&quot;</K>: <S>&quot;Akwa, Douala, Cameroon&quot;</S>,{" "}
              <K>&quot;place_id&quot;</K>: <S>&quot;ChIJ6Yas2F8SYRARJq4txF-eIIw&quot;</S> {"}"}
              {"\n  ]"}
              {"\n}"}
            </CodeBlock>
            <p className="text-gray-600 mb-6">
              <strong>Non facturé.</strong> Générez un <InlineCode>session_token</InlineCode> (un UUID de votre
              côté) au début de la saisie et réutilisez-le pour tous les appels <InlineCode>autocomplete</InlineCode>{" "}
              de la même recherche.
            </p>

            <Endpoint method="GET" path="/partner-api/v1/places/details?place_id=...&session_token=..." />
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;address&quot;</K>: <S>&quot;Akwa I, Douala, Cameroon&quot;</S>,
              {"\n  "}
              <K>&quot;lat&quot;</K>: <S>4.0531425</S>, <K>&quot;lng&quot;</K>: <S>9.6995823</S>,
              {"\n  "}
              <K>&quot;wallet_balance_after&quot;</K>: <S>48500</S>
              {"\n}"}
            </CodeBlock>
            <p className="text-gray-600">
              <strong>Facturé</strong> (action <InlineCode>place_lookup</InlineCode>, cf.{" "}
              <a href="#billing" className="text-red-600 hover:underline">
                section 8
              </a>
              ) — c&apos;est cet appel qui clôt la session et engage un coût réel, jamais{" "}
              <InlineCode>autocomplete</InlineCode>. <InlineCode>402 insufficient_wallet_balance</InlineCode> si le
              solde ne le permet pas.
            </p>
          </section>

          <section id="create" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-extrabold mb-2">Créer une livraison</h2>
            <Endpoint method="POST" path="/partner-api/v1/deliveries" />

            <h3 className="font-bold text-lg mb-2">Requête</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-2 pr-4 font-semibold">Champ</th>
                    <th className="py-2 pr-4 font-semibold">Type</th>
                    <th className="py-2 pr-4 font-semibold">Obligatoire</th>
                    <th className="py-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>pickup.address</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Adresse texte du point de retrait</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>pickup.lat</InlineCode> / <InlineCode>pickup.lng</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">number</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Coordonnées du point de retrait</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>pickup.contact_name</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Nom à contacter au retrait</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>pickup.contact_phone</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Téléphone à contacter au retrait</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>dropoff.address</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Adresse texte de la destination</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>dropoff.lat</InlineCode> / <InlineCode>dropoff.lng</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">number</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Coordonnées de la destination</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>dropoff.contact_name</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Nom du destinataire</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>dropoff.contact_phone</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">Téléphone du destinataire</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>category_id</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">integer</td>
                    <td className="py-2.5 pr-4 font-semibold text-red-600">Oui</td>
                    <td className="py-2.5 text-gray-600">
                      Type de véhicule/colis — voir{" "}
                      <a href="#vehicle-types" className="text-red-600 hover:underline">section 2</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>order_items</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">array</td>
                    <td className="py-2.5 pr-4 text-gray-400">Non</td>
                    <td className="py-2.5 text-gray-600">Articles transportés — <InlineCode>{"[{label, quantity}]"}</InlineCode></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4"><InlineCode>notes</InlineCode></td>
                    <td className="py-2.5 pr-4 text-gray-500">string</td>
                    <td className="py-2.5 pr-4 text-gray-400">Non</td>
                    <td className="py-2.5 text-gray-600">Note libre pour le livreur (code d&apos;accès, étage...)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;pickup&quot;</K>: {"{"}
              {"\n    "}
              <K>&quot;address&quot;</K>: <S>&quot;Akwa, Douala&quot;</S>,
              {"\n    "}
              <K>&quot;lat&quot;</K>: <S>4.0483</S>, <K>&quot;lng&quot;</K>: <S>9.7043</S>,
              {"\n    "}
              <K>&quot;contact_name&quot;</K>: <S>&quot;Boutique Akwa&quot;</S>,
              {"\n    "}
              <K>&quot;contact_phone&quot;</K>: <S>&quot;699000001&quot;</S>
              {"\n  }"},{"\n  "}
              <K>&quot;dropoff&quot;</K>: {"{"}
              {"\n    "}
              <K>&quot;address&quot;</K>: <S>&quot;Bonapriso, Douala&quot;</S>,
              {"\n    "}
              <K>&quot;lat&quot;</K>: <S>4.0221</S>, <K>&quot;lng&quot;</K>: <S>9.6987</S>,
              {"\n    "}
              <K>&quot;contact_name&quot;</K>: <S>&quot;Jean Client&quot;</S>,
              {"\n    "}
              <K>&quot;contact_phone&quot;</K>: <S>&quot;677000002&quot;</S>
              {"\n  }"},{"\n  "}
              <K>&quot;category_id&quot;</K>: <S>1</S>,{"\n  "}
              <K>&quot;notes&quot;</K>: <S>&quot;Sonner à l&apos;interphone&quot;</S>
              {"\n}"}
            </CodeBlock>

            <h3 className="font-bold text-lg mb-2">
              Réponse — <span className="text-emerald-600 font-mono text-base">201 Created</span>
            </h3>
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;delivery_id&quot;</K>: <S>&quot;8f14e45f-ceea-467e-bd97-4b3a1c1e0f6a&quot;</S>,
              {"\n  "}
              <K>&quot;status&quot;</K>: <S>&quot;driver_assigned&quot;</S>,
              {"\n  "}
              <K>&quot;distance_km&quot;</K>: <S>4.8</S>, <K>&quot;duration_min&quot;</K>:{" "}
              <S>14.2</S>,{"\n  "}
              <K>&quot;price&quot;</K>: {"{"} <K>&quot;amount&quot;</K>: <S>1220</S>,{" "}
              <K>&quot;currency&quot;</K>: <S>&quot;XAF&quot;</S> {"}"},{"\n  "}
              <K>&quot;wallet_balance_after&quot;</K>: <S>48490</S>
              {"\n}"}
            </CodeBlock>
            <p className="text-gray-600 mb-6">
              <InlineCode>delivery_id</InlineCode> est l&apos;identifiant public à utiliser pour le
              suivi et l&apos;annulation.
            </p>

            <h3 className="font-bold text-lg mb-2">Erreurs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-2 pr-4 font-semibold">HTTP</th>
                    <th className="py-2 pr-4 font-semibold">Code</th>
                    <th className="py-2 font-semibold">Signification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-4 font-mono">422</td>
                    <td className="py-3 pr-4">
                      <InlineCode>validation_error</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">Champ manquant ou invalide</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono">402</td>
                    <td className="py-3 pr-4">
                      <InlineCode>subscription_required</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">Abonnement inactif ou quota épuisé</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono">402</td>
                    <td className="py-3 pr-4">
                      <InlineCode>insufficient_wallet_balance</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">
                      Solde du portefeuille API insuffisant — voir{" "}
                      <a href="#billing" className="text-red-600 hover:underline">
                        section 8
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono">502</td>
                    <td className="py-3 pr-4">
                      <InlineCode>distance_calculation_failed</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">Distance introuvable entre les deux points</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono">500</td>
                    <td className="py-3 pr-4">
                      <InlineCode>delivery_creation_failed</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">
                      Erreur technique — le quota et les frais API ne sont pas décomptés
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="matching" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <MapPinned className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">Attribution du livreur</h2>
            </div>
            <p className="text-gray-600 mb-6">
              À la création, Carygoo cherche un livreur disponible en deux temps :
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <p className="font-bold mb-1">1 · Votre flotte</p>
                <p className="text-sm text-gray-600">
                  Vos chauffeurs/véhicules déclarés dans votre tableau de bord sont toujours essayés
                  en premier.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <p className="font-bold mb-1">2 · Pool global Carygoo</p>
                <p className="text-sm text-gray-600">
                  Si aucun de vos chauffeurs n&apos;est libre, bascule automatique sur le réseau
                  Carygoo — sauf si désactivé.
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Ce réglage (<InlineCode>fallback_to_global_pool</InlineCode>, activé par défaut) se
              configure depuis votre tableau de bord, section <strong>Intégration API</strong>.
            </p>
            <p className="text-gray-600">
              Si aucun livreur n&apos;est trouvé immédiatement, la livraison passe au statut{" "}
              <InlineCode>no_driver_found</InlineCode> et Carygoo continue de chercher automatiquement
              (tentatives espacées de 30s à 5min) — vous êtes notifié par webhook dès qu&apos;un
              livreur est trouvé.
            </p>
          </section>

          <section id="track" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-extrabold mb-2">Suivre / annuler</h2>
            <Endpoint method="GET" path="/partner-api/v1/deliveries/{delivery_id}" />
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;delivery_id&quot;</K>: <S>&quot;8f14e45f-ceea-467e-bd97-4b3a1c1e0f6a&quot;</S>,
              {"\n  "}
              <K>&quot;status&quot;</K>: <S>&quot;picked_up&quot;</S>,
              {"\n  "}
              <K>&quot;price&quot;</K>: {"{"} <K>&quot;amount&quot;</K>: <S>1220</S>,{" "}
              <K>&quot;currency&quot;</K>: <S>&quot;XAF&quot;</S> {"}"},{"\n  "}
              <K>&quot;driver&quot;</K>: {"{"}
              {"\n    "}
              <K>&quot;name&quot;</K>: <S>&quot;Paul Mbarga&quot;</S>,
              {"\n    "}
              <K>&quot;phone&quot;</K>: <S>&quot;690000000&quot;</S>,
              {"\n    "}
              <K>&quot;vehicle_plate&quot;</K>: <S>&quot;LT-1234-AB&quot;</S>,
              {"\n    "}
              <K>&quot;position&quot;</K>: {"{"} <K>&quot;lat&quot;</K>: <S>4.031</S>,{" "}
              <K>&quot;lng&quot;</K>: <S>9.701</S> {"}"}
              {"\n  }"}
              {"\n}"}
            </CodeBlock>

            <Endpoint method="POST" path="/partner-api/v1/deliveries/{delivery_id}/cancel" />
            <p className="text-gray-600 mb-8">
              Possible uniquement avant récupération par le livreur (<InlineCode>pending</InlineCode>,{" "}
              <InlineCode>driver_assigned</InlineCode>, <InlineCode>no_driver_found</InlineCode>) —
              sinon <InlineCode>409 delivery_not_cancelable</InlineCode>.
            </p>

            <h3 className="font-bold text-lg mb-3">Cycle de vie</h3>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {["pending", "driver_assigned", "picked_up", "delivered"].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-mono shadow-sm">
                    {s}
                  </span>
                  {i < arr.length - 1 && <span className="text-gray-300">→</span>}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-1">
              ↳ à tout moment avant <InlineCode>picked_up</InlineCode> :{" "}
              <span className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-mono shadow-sm">
                canceled
              </span>
            </p>
            <p className="text-sm text-gray-500">
              ↳ si aucun livreur :{" "}
              <span className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-mono shadow-sm">
                no_driver_found
              </span>{" "}
              → retrouvé →{" "}
              <span className="bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-mono shadow-sm">
                driver_assigned
              </span>
            </p>
          </section>

          <section id="webhooks" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <Webhook className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">Webhooks</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Configurez une URL de callback depuis votre tableau de bord (section{" "}
              <strong>Intégration API</strong>). Carygoo y envoie un <InlineCode>POST</InlineCode> JSON
              à chaque événement.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                    <th className="py-2 pr-4 font-semibold">Événement</th>
                    <th className="py-2 font-semibold">Déclencheur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-4">
                      <InlineCode>delivery.status_changed</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">Le statut de la livraison change</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      <InlineCode>delivery.position_updated</InlineCode>
                    </td>
                    <td className="py-3 text-gray-600">
                      Position GPS du livreur — au plus 1×/10s par livraison
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-lg mb-2">Payload</h3>
            <CodeBlock>
              {"{"}
              {"\n  "}
              <K>&quot;event&quot;</K>: <S>&quot;delivery.status_changed&quot;</S>,
              {"\n  "}
              <K>&quot;data&quot;</K>: {"{"}
              {"\n    "}
              <K>&quot;delivery_id&quot;</K>: <S>&quot;8f14e45f-...&quot;</S>,
              {"\n    "}
              <K>&quot;status&quot;</K>: <S>&quot;driver_assigned&quot;</S>,
              {"\n    "}
              <K>&quot;driver&quot;</K>: {"{"} <K>&quot;name&quot;</K>:{" "}
              <S>&quot;Paul Mbarga&quot;</S>, ... {"}"}
              {"\n  }"}
              {"\n}"}
            </CodeBlock>

            <h3 className="font-bold text-lg mb-2">Vérifier la signature</h3>
            <p className="text-gray-600 mb-6">
              Chaque requête inclut <InlineCode>X-Carygoo-Event</InlineCode>,{" "}
              <InlineCode>X-Carygoo-Timestamp</InlineCode> et{" "}
              <InlineCode>X-Carygoo-Signature</InlineCode> — un HMAC-SHA256 de{" "}
              <InlineCode>timestamp + &quot;.&quot; + corps_brut</InlineCode> avec votre{" "}
              <InlineCode>webhook_secret</InlineCode> (affiché une seule fois, comme votre{" "}
              <InlineCode>api_secret</InlineCode>).
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="font-bold mb-2">PHP</p>
                <CodeBlock>
                  <K>$expected</K> = hash_hmac(<S>&apos;sha256&apos;</S>, <K>$timestamp</K>.
                  <S>&apos;.&apos;</S>.<K>$rawBody</K>, <K>$secret</K>);{"\n\n"}
                  <K>if</K> (!hash_equals(<K>$expected</K>, <K>$signature</K>)) {"{"}
                  {"\n    "}http_response_code(<S>401</S>);
                  {"\n    "}
                  <K>exit</K>;{"\n"}
                  {"}"}
                </CodeBlock>
              </div>
              <div>
                <p className="font-bold mb-2">Node.js</p>
                <CodeBlock>
                  <K>const</K> expected = crypto{"\n  "}.createHmac(<S>&apos;sha256&apos;</S>, secret)
                  {"\n  "}.update(<S>`${"{timestamp}"}.${"{rawBody}"}`</S>)
                  {"\n  "}.digest(<S>&apos;hex&apos;</S>);{"\n\n"}
                  <K>if</K> (!crypto.timingSafeEqual(
                  {"\n  "}Buffer.from(expected), Buffer.from(signature)
                  {"\n"})) <K>return</K> res.status(<S>401</S>).end();
                </CodeBlock>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <p className="font-semibold text-emerald-700 mb-1">Accusé de réception</p>
              <p className="text-sm text-emerald-700/80">
                Répondez <InlineCode>2xx</InlineCode> sous 10s. En cas d&apos;échec, Carygoo retente
                jusqu&apos;à 5 fois (10s, 30s, 1min, 5min, 15min). L&apos;historique de tous les envois est
                consultable depuis votre tableau de bord.
              </p>
            </div>
          </section>

          <section id="billing" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">Portefeuille API</h2>
            </div>
            <p className="text-gray-600 mb-6">
              L&apos;usage de l&apos;API a un coût réel pour Carygoo (Google Distance Matrix à chaque livraison,
              Google Places si vous utilisez la{" "}
              <a href="#places" className="text-red-600 hover:underline">
                recherche d&apos;adresse
              </a>
              , infrastructure) — distinct du prix de la livraison elle-même, qui rémunère le livreur.
            </p>

            {billingRates ? (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Par livraison créée
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900 mb-1">
                    {billingRates.delivery_creation.total.toLocaleString("fr-FR")} FCFA
                  </p>
                  <p className="text-xs text-gray-500">
                    Google {billingRates.delivery_creation.google} + Infra {billingRates.delivery_creation.infra} +
                    Marge {billingRates.delivery_creation.margin}
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Par recherche d&apos;adresse
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900 mb-1">
                    {billingRates.place_lookup.total.toLocaleString("fr-FR")} FCFA
                  </p>
                  <p className="text-xs text-gray-500">
                    Google {billingRates.place_lookup.google} + Infra {billingRates.place_lookup.infra} + Marge{" "}
                    {billingRates.place_lookup.margin}
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                      <th className="py-2 pr-4 font-semibold">Action</th>
                      <th className="py-2 font-semibold">Facturé quand</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 pr-4">
                        <InlineCode>delivery_creation</InlineCode>
                      </td>
                      <td className="py-3 text-gray-600">
                        À chaque <InlineCode>POST /deliveries</InlineCode> réussi
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">
                        <InlineCode>place_lookup</InlineCode>
                      </td>
                      <td className="py-3 text-gray-600">
                        À chaque <InlineCode>GET /places/details</InlineCode> réussi (jamais{" "}
                        <InlineCode>autocomplete</InlineCode>)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <p className="text-gray-600">
              Rechargez votre portefeuille en Mobile Money (MTN/Orange, via Dohone — le même moyen déjà utilisé pour
              votre abonnement) depuis votre tableau de bord. Un solde négatif (dette) est toléré jusqu&apos;à un
              plafond défini par Carygoo — au-delà, l&apos;API renvoie{" "}
              <InlineCode>402 insufficient_wallet_balance</InlineCode> jusqu&apos;à recharge.
            </p>
          </section>

          <section id="currency" className="mb-8 scroll-mt-24">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-5 h-5 text-red-600" />
              <h2 className="text-2xl font-extrabold">Devise</h2>
            </div>
            <p className="text-gray-600">
              Tous les montants sont exprimés en <strong>XAF</strong> (Francs CFA), en unité entière.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

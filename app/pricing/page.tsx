import { CircleCheck } from "lucide-react";

interface Plan {
  id: number;
  slug: string;
  name: string;
  price: number;
  dispatches_included: number;
  price_per_extra_dispatch: number;
  features: string[];
  is_contact_sales: boolean;
}

async function getPlans(): Promise<Plan[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partners/v1/plan/list`, {
      next: { revalidate: 300 },
    });
    const result = await response.json();
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

const formatFcfa = (amount: number) => `${amount.toLocaleString("fr-FR")} FCFA`;

export default async function PricingPage() {
  const plans = await getPlans();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          <span className="text-gray-900">Des tarifs </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            simples et transparents
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choisissez l&apos;offre qui correspond au volume de livraisons de votre entreprise. Changez d&apos;offre à
          tout moment.
        </p>
      </section>

      {/* Plans */}
      <section className="pb-24 px-4">
        {plans.length === 0 ? (
          <p className="text-center text-gray-500">
            Les offres sont momentanément indisponibles — contactez-nous pour en savoir plus.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {plans.map((plan, index) => {
              const isFeatured = index === 1;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col p-8 rounded-2xl border transition-all ${
                    isFeatured
                      ? "bg-gray-900 border-gray-900 text-white shadow-2xl md:-translate-y-3"
                      : "bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md"
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Le plus populaire
                    </span>
                  )}

                  <h3 className={`text-xl font-bold mb-1 ${isFeatured ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{formatFcfa(plan.price)}</span>
                    <span className={`text-sm ml-1 ${isFeatured ? "text-gray-400" : "text-gray-500"}`}></span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-2 text-sm">
                      <CircleCheck size={16} className="text-red-500 mt-0.5 shrink-0" />
                      <span>{plan.dispatches_included.toLocaleString("fr-FR")} livraisons incluses</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CircleCheck size={16} className="text-red-500 mt-0.5 shrink-0" />
                      <span>{formatFcfa(plan.price_per_extra_dispatch)} par livraison au-delà du quota</span>
                    </li>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CircleCheck size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className={`w-full text-center font-bold py-3 rounded-xl transition-colors ${
                      isFeatured
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-900 hover:bg-black text-white"
                    }`}
                  >
                    {plan.is_contact_sales ? "Contacter la vente" : "Choisir cette offre"}
                  </a>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-12">
          Tous les tarifs sont exprimés en Francs CFA (XAF). Besoin d&apos;une offre sur mesure ?{" "}
          <a href="/contact" className="text-red-600 font-semibold hover:underline">
            Contactez-nous
          </a>
          .
        </p>
      </section>
    </div>
  );
}

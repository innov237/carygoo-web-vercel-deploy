"use client";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800 px-6 py-12 md:px-20">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="space-y-2 mt-16">
                    <h1 className="text-3xl md:text-4xl font-bold">Politique de confidentialité – Carygoo</h1>
                    <p className="text-sm text-gray-500">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
                </header>

                <section className="space-y-3">
                    <p>
                        Carygoo accorde une importance capitale à la protection de vos données personnelles.
                        Cette politique de confidentialité explique comment nous collectons, utilisons,
                        stockons et protégeons vos informations lorsque vous utilisez nos services de mobilité
                        et de transport.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">1. Données collectées</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Informations d’identification : nom, prénom, numéro de téléphone, adresse e-mail</li>
                        <li>Données de trajet : points de départ et d’arrivée, itinéraires, horaires</li>
                        <li>Données de paiement : montants, historiques de transactions (sans stocker les données sensibles)</li>
                        <li>Données techniques : adresse IP, type d’appareil, système d’exploitation</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">2. Utilisation des données</h2>
                    <p>Vos données sont utilisées pour :</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Fournir et améliorer les services Carygoo</li>
                        <li>Gérer les réservations, trajets et paiements</li>
                        <li>Assurer la sécurité des utilisateurs et prévenir la fraude</li>
                        <li>Vous contacter pour des notifications importantes</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">3. Partage des données</h2>
                    <p>
                        Carygoo ne vend pas vos données personnelles. Certaines informations peuvent être
                        partagées avec des partenaires techniques ou prestataires de paiement uniquement
                        lorsque cela est nécessaire au fonctionnement du service.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">4. Conservation et sécurité</h2>
                    <p>
                        Vos données sont conservées aussi longtemps que nécessaire pour fournir nos services
                        et respecter nos obligations légales. Nous mettons en place des mesures de sécurité
                        techniques et organisationnelles afin de protéger vos informations.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">5. Vos droits</h2>
                    <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Droit d’accès, de rectification et de suppression de vos données</li>
                        <li>Droit d’opposition ou de limitation du traitement</li>
                        <li>Droit à la portabilité de vos données</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">6. Données de localisation</h2>
                    <p>
                        Carygoo peut collecter des données de localisation en temps réel uniquement lorsque
                        cela est nécessaire au bon déroulement des trajets. Vous pouvez désactiver cette
                        fonctionnalité à tout moment via les paramètres de votre appareil.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">7. Modifications</h2>
                    <p>
                        Cette politique de confidentialité peut être mise à jour. Toute modification
                        importante sera notifiée via l’application ou le site Carygoo.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">8. Contact</h2>
                    <p>
                        Pour toute question relative à cette politique de confidentialité ou à vos données
                        personnelles, vous pouvez nous contacter à l’adresse suivante :
                    </p>
                    <p className="font-medium">privacy@carygoo.com</p>
                </section>
            </div>
        </main>
    );
}

import type { Metadata } from "next";
import DeletionRequestForm from "./deletion-request-form";

export const metadata: Metadata = {
    title: "Demande de suppression de compte — Carygoo",
    description:
        "Demandez la suppression de votre compte Carygoo et des données associées. Procédure, données supprimées et délais de conservation.",
};

// Page publique exigée par Google Play (Data safety → Account deletion URL).
// Elle doit : nommer l'app/le développeur, décrire les étapes, préciser les
// données supprimées / conservées et la durée de conservation.
export default function AccountDeletionRequestPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800 px-6 py-12 md:px-20">
            <div className="max-w-4xl mx-auto space-y-10">
                <header className="space-y-2 mt-16">
                    <h1 className="text-3xl md:text-4xl font-bold">Demande de suppression de compte</h1>
                    <p className="text-gray-500">
                        Application <strong>Carygoo</strong>, éditée par Carygoo. Cette page vous permet de demander
                        la suppression de votre compte et des données personnelles associées.
                    </p>
                </header>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">1. Depuis l&apos;application mobile</h2>
                    <ol className="list-decimal pl-6 space-y-1">
                        <li>Ouvrez l&apos;application Carygoo et connectez-vous.</li>
                        <li>Allez dans <strong>Mon compte</strong> (modifier le profil).</li>
                        <li>Appuyez sur <strong>Supprimer mon compte</strong>.</li>
                        <li>Confirmez la suppression dans la fenêtre qui s&apos;affiche.</li>
                    </ol>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">2. Depuis ce site (sans l&apos;application)</h2>
                    <p>
                        Remplissez le formulaire ci-dessous avec l&apos;adresse e-mail et/ou le numéro de téléphone
                        associés à votre compte. Nous pourrons vous contacter pour vérifier votre identité avant
                        de procéder à la suppression.
                    </p>
                    <DeletionRequestForm />
                    <p className="text-sm text-gray-500">
                        Vous pouvez aussi écrire à <span className="font-medium">privacy@carygoo.com</span> avec
                        l&apos;objet « Suppression de compte ».
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">3. Données supprimées</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Informations d&apos;identification : nom, prénom, e-mail, numéro de téléphone, photo</li>
                        <li>Identifiants de connexion et jetons d&apos;authentification</li>
                        <li>Historique des courses et livraisons, adresses enregistrées</li>
                        <li>Données de localisation liées à votre compte</li>
                        <li>Préférences et jetons de notification</li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold">4. Données conservées et durée</h2>
                    <p>
                        Certaines données peuvent être conservées de façon limitée lorsque la loi l&apos;exige ou
                        pour des raisons de sécurité :
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            Données de transactions et de facturation : conservées pour nos obligations comptables
                            et fiscales, jusqu&apos;à 10 ans, puis supprimées.
                        </li>
                        <li>
                            Données nécessaires à la prévention de la fraude ou à un litige en cours : conservées
                            jusqu&apos;à la résolution du litige.
                        </li>
                    </ul>
                    <p>
                        La suppression est effectuée dans un délai d&apos;environ <strong>72 heures</strong> après
                        réception de la demande, et au maximum sous 30 jours. Cette opération est définitive.
                    </p>
                </section>
            </div>
        </main>
    );
}

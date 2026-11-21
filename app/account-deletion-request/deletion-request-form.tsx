"use client";
import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FieldErrors {
    [field: string]: string[];
}

// Réutilise l'endpoint public /contact : la demande est persistée et notifiée
// par e-mail à l'équipe, qui traite la suppression manuellement.
export default function DeletionRequestForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const fieldError = (field: string) => fieldErrors[field]?.[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFieldErrors({});
        setIsSubmitting(true);

        const message = [
            "[DEMANDE DE SUPPRESSION DE COMPTE]",
            `E-mail du compte : ${email}`,
            `Téléphone du compte : ${phone || "non renseigné"}`,
            `Motif : ${reason || "non renseigné"}`,
        ].join("\n");

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    company: "Suppression de compte",
                    message,
                }),
            });
            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
            } else if (result.data && typeof result.data === "object") {
                setFieldErrors(result.data);
                setFormError("Le formulaire contient des erreurs — corrigez-les ci-dessous.");
            } else {
                setFormError(result.message || "Une erreur est survenue.");
            }
        } catch {
            setFormError("Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold text-green-800">Demande envoyée</p>
                    <p className="text-green-700 text-sm mt-1">
                        Votre demande de suppression a bien été reçue. Une confirmation sera envoyée à{" "}
                        <strong>{email}</strong> une fois le compte supprimé.
                    </p>
                </div>
            </div>
        );
    }

    const inputClass =
        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 text-gray-900";

    return (
        <form className="space-y-4 rounded-xl border border-gray-200 p-6" onSubmit={handleSubmit}>
            {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{formError}</div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="del-name">Nom complet *</label>
                <input id="del-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
                {fieldError("name") && <p className="mt-1 text-xs text-red-600">{fieldError("name")}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="del-email">E-mail du compte *</label>
                <input id="del-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
                {fieldError("email") && <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="del-phone">Téléphone du compte</label>
                <input id="del-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                {fieldError("phone") && <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="del-reason">Motif (facultatif)</label>
                <textarea id="del-reason" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} className={inputClass} />
            </div>

            <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1" required />
                <span>Je comprends que la suppression de mon compte est définitive et que mes données ne pourront pas être récupérées.</span>
            </label>

            <button
                type="submit"
                disabled={isSubmitting || !confirmed}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
            >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Demander la suppression
            </button>
        </form>
    );
}

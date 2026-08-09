"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, PackageCheck, PackageX, Lock, Clock } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const STATUS_LABELS: Record<string, string> = {
  PENDING_COLLECTION: "En attente de collecte",
  COLLECTED_BY_AGENCY: "Collecté par l'agence",
  RECEIVED_AT_AGENCY: "Reçu à l'agence",
  IN_TRANSIT: "En transit",
  ARRIVED_AT_DESTINATION_AGENCY: "Arrivé à l'agence de destination",
  IN_TRANSIT_TO_RELAY_POINT: "En route vers le point relais",
  AVAILABLE_AT_RELAY_POINT: "Disponible au point relais",
  OUT_FOR_DELIVERY: "En cours de livraison",
  DELIVERED: "Livré",
  WITHDRAWN: "Retiré",
  CANCELLED: "Annulé",
};

const PARCEL_TYPE_LABELS: Record<string, string> = {
  STANDARD: "Standard",
  DOCUMENT: "Document",
  FRAGILE: "Fragile",
  PERISHABLE: "Périssable",
  OTHER: "Autre",
};

interface ParcelEvent {
  id: number;
  status?: string;
  label?: string;
  created_at: string;
}

interface TrackResult {
  tracking_number: string;
  status: string;
  parcel_type: string;
  delivery_mode: string;
  origin_relay_point: { name: string; city: string } | null;
  destination_relay_point: { name: string; city: string } | null;
  departure_agency: { name: string; city: string } | null;
  destination_agency: { name: string; city: string } | null;
  events: ParcelEvent[];
  sender_name: string | null;
  sender_phone: string | null;
  recipient_name: string | null;
  recipient_phone: string | null;
}

export default function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setResult(null);
    setNotFound(false);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/parcels/v1/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tracking_number: trackingNumber.trim(),
          pin_code: pinCode.trim() || undefined,
        }),
      });
      const result_ = await response.json();

      if (result_.success) {
        setResult(result_.data);
      } else {
        setNotFound(true);
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessayez dans un instant.");
    } finally {
      setIsLoading(false);
    }
  };

  const originLabel = result?.origin_relay_point
    ? `${result.origin_relay_point.name} (${result.origin_relay_point.city})`
    : result?.departure_agency
    ? `${result.departure_agency.name} (${result.departure_agency.city})`
    : null;

  const destinationLabel = result?.destination_relay_point
    ? `${result.destination_relay_point.name} (${result.destination_relay_point.city})`
    : result?.destination_agency
    ? `${result.destination_agency.name} (${result.destination_agency.city})`
    : null;

  const hasContactDetails = result?.sender_name || result?.recipient_name;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3">
        <input
          type="text"
          placeholder="Numéro de suivi"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
          required
        />
        <input
          type="text"
          placeholder="Code PIN (optionnel)"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Suivre
        </button>
      </form>

      <AnimatePresence mode="wait">
        {notFound && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800"
          >
            <PackageX size={20} className="shrink-0" />
            <p className="text-sm">Aucun colis trouvé pour ce numéro de suivi. Vérifiez la saisie et réessayez.</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="bg-gray-950 text-white px-5 py-4 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <PackageCheck size={18} className="text-red-500" />
                <span className="font-mono text-sm">{result.tracking_number}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-red-600 px-3 py-1 rounded-full">
                {STATUS_LABELS[result.status] || result.status}
              </span>
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Type de colis</p>
                <p className="text-gray-900 font-medium">{PARCEL_TYPE_LABELS[result.parcel_type] || result.parcel_type}</p>
              </div>
              {originLabel && (
                <div>
                  <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Origine</p>
                  <p className="text-gray-900 font-medium">{originLabel}</p>
                </div>
              )}
              {destinationLabel && (
                <div>
                  <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Destination</p>
                  <p className="text-gray-900 font-medium">{destinationLabel}</p>
                </div>
              )}
            </div>

            {result.events?.length > 0 && (
              <div className="px-5 pb-5">
                <p className="text-gray-400 text-xs uppercase font-semibold mb-3">Historique</p>
                <ul className="space-y-2">
                  {result.events.map((event) => (
                    <li key={event.id} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Clock size={14} className="mt-0.5 text-gray-400 shrink-0" />
                      <span>
                        {STATUS_LABELS[event.status || ""] || event.label || event.status}
                        <span className="text-gray-400 ml-2">
                          {new Date(event.created_at).toLocaleString("fr-FR")}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasContactDetails ? (
              <div className="px-5 pb-5 pt-2 border-t border-gray-100 grid sm:grid-cols-2 gap-4 text-sm">
                {result.sender_name && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Expéditeur</p>
                    <p className="text-gray-900">{result.sender_name} — {result.sender_phone}</p>
                  </div>
                )}
                {result.recipient_name && (
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Destinataire</p>
                    <p className="text-gray-900">{result.recipient_name} — {result.recipient_phone}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                <Lock size={13} />
                Saisissez le code PIN reçu par l&apos;expéditeur pour voir les coordonnées complètes.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

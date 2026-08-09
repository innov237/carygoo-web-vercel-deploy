"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, MapPin, Building2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RelayPoint {
  id: number;
  name: string;
  city: string;
  address: string | null;
}

export default function RelayPointSearchWidget() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<RelayPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("query", query.trim());

      const response = await fetch(`${API_URL}/parcels/v1/public/relay-points?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setResults(result.data || []);
      } else {
        setResults([]);
      }
    } catch {
      setError("Impossible de contacter le serveur. Réessayez dans un instant.");
    } finally {
      setHasSearched(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Rechercher par ville ou nom du point relais"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Rechercher
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <AnimatePresence>
        {hasSearched && !error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Aucun point relais trouvé pour cette recherche.</p>
            ) : (
              <ul className="grid sm:grid-cols-2 gap-3">
                {results.map((point, index) => (
                  <motion.li
                    key={point.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <Building2 size={16} className="text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{point.name}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="shrink-0" />
                        <span className="truncate">{point.address ? `${point.address}, ` : ""}{point.city}</span>
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

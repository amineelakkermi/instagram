"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoggedInContent() {
  const searchParams = useSearchParams();
  const username = searchParams.get("user") || "Utilisateur";

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        {/* Success Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Vous êtes connecté !
        </h1>
        <p className="text-base text-gray-500">
          Bienvenue, <span className="font-semibold text-gray-800">{username}</span>
        </p>

        <a
          href="/"
          className="mt-4 rounded-full bg-[#0095f6] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1877f2] transition-colors"
        >
          Se déconnecter
        </a>
      </div>
    </div>
  );
}

export default function LoggedIn() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Chargement...</div>}>
      <LoggedInContent />
    </Suspense>
  );
}

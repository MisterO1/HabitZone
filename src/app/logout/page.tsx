'use client';

export default function LogoutPage() {
  // Supprimer le token et les infos utilisateur du stockage local
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Rediriger vers la page de connexion
    window.location.href = "/login";
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Déconnexion...</p>
    </div>
  );
}
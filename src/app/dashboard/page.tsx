'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Page() {
  const [isAuth, setIsAuth] = useState(false);
  // let user = null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      // user = JSON.parse(localStorage.getItem("user") || '{}');
    } else {
      window.location.href = "/login";
    }
  })

  if (!isAuth) {
    return <p>Chargement...</p>;
  }
  
  return (
  <div>
    <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
    <div className="mb-4">
      <Button 
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        Se déconnecter
      </Button>
    </div>
  </div>
  
  );
}

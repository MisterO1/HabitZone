"use client";

import { useState } from "react";
import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.token); // stocker le JWT
      localStorage.setItem("user", JSON.stringify(res.plainUser)); // stocker les infos utilisateur
      setMessage("Connexion réussie !");
      window.location.href = "/dashboard"; // redirection simpliste

    } catch (err: any) {
      setMessage(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Connexion</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
        >
          Se connecter
        </Button>
        {message && <p className="text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
}

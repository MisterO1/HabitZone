"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {

      const res = await registerUser(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.plainUser));
      setMessage("Inscription réussie !");
      window.location.href = "/dashboard";
      
    } catch (e) {
      setMessage("Une erreur est survenue");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Créer un compte</h1>
        <Input
          type="email"
          placeholder="Email"
          // className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
        <Input
          type="password"
          placeholder="Mot de passe"
          // className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          // className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          S’inscrire
        </Button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}

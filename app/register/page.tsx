"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto sign in the user after successful registration
      const signInResult = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/",
      });

      // If signIn doesn't redirect, clear loading
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {error && (
          <div className="mb-3 text-red-600 text-sm bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <input
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Full name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}

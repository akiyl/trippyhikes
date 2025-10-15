"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Sign in without redirect so we can inspect the session and redirect based on role
    let res;
    try {
      res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } catch (err: any) {
      setError(err?.message || "Sign-in failed");
      setLoading(false);
      return;
    }

    // If signIn returned ok, fetch the server session to check role
    if (res && (res as any).ok) {
      try {
        const sessRes = await fetch("/api/admin/session");
        if (sessRes.ok) {
          const session = await sessRes.json();
          const role = session?.user?.role;
          if (role === "ADMIN") {
            window.location.href = "/admin";
            return;
          }
        }
      } catch (err) {
        // ignore and fallback to default redirect
      }

      // Default redirect for non-admins
      window.location.href = "/";
    }
    // if we reached here without redirect, show an error
    if (!res || !(res as any).ok) {
      setError((res as any)?.error || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}

        <input
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="w-full border rounded-md p-2 mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

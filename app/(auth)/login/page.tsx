"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      setError(data.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* LOGO */}
      <div className="absolute top-6 left-8">
        <h1 className="text-2xl font-bold text-blue-700">Academic Hub</h1>
      </div>

      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-50 p-12">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome Back 👋
        </h2>
        <p className="text-gray-600 max-w-md text-center">
          Access your dashboard, upload documents, and continue your academic
          journey effortlessly.
        </p>
        <img
          src="/placeholder-user.jpg"
          alt="Student"
          className="mt-8 w-80 rounded-xl shadow-md"
        />
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex-1 flex justify-center items-center bg-gray-50 p-12">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            Login to Your Account
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm mt-6 text-gray-600 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
    
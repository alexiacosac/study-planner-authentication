"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const register = async () => {
    setError("")

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const text = await res.text()
      setError(text || "Registration failed")
      return
    }

    // ✅ redirect corect
    router.push("/login")
  }

  return (
    <main className="mx-auto max-w-md p-10">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>

      <input
        type="email"
        className="mb-3 w-full rounded border px-3 py-2"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />


      <input
        type="password"
        className="mb-4 w-full rounded border px-3 py-2"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={register}
        className="w-full rounded bg-black px-4 py-2 text-white hover:bg-pink-300 hover:text-black transition"
      >
        Create account
      </button>

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}
    </main>
  )
}

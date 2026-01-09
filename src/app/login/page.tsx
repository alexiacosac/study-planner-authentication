"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const login = async () => {
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Invalid credentials")
    } else {
      // ✅ redirect corect
      router.push("/planner")
    }
  }

  return (
    <main className="mx-auto max-w-md p-10">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>

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
        onClick={login}
        className="w-full rounded bg-black px-4 py-2 text-white hover:bg-pink-300 hover:text-black transition"
      >
        Login
      </button>

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}
    </main>
  )
}

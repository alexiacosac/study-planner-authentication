"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // dacă e deja logată → direct în planner
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/planner")
    }
  }, [status, router])

  if (status === "loading") {
    return <p className="p-10">Loading...</p>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">📚 Study Planner</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded bg-black px-4 py-2 text-white hover:bg-pink-300 hover:text-black transition"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded bg-black px-4 py-2 text-white hover:bg-pink-300 hover:text-black transition"
        >
          Register
        </Link>
      </div>
    </main>
  )
}

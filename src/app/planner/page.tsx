'use client'

import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

type Task = {
  id: string
  title: string
  completed: boolean
  dueDate?: string | null
}

function daysUntil(date: string) {
  const today = new Date()
  const due = new Date(date)

  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  return Math.ceil(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
}

export default function PlannerPage() {
  const { data: session, status } = useSession()

  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  // 🔐 redirect dacă NU e logată
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
    }
  }, [status])

  // 📥 load task-uri DOAR când e logată
  useEffect(() => {
    if (status === "authenticated") {
      load()
    }
  }, [status])

  const load = async () => {
    const r = await fetch('/api/tasks')

    if (!r.ok) {
      setTasks([])
      return
    }

    const data = await r.json()
    setTasks(Array.isArray(data) ? data : [])
  }

  const add = async () => {
    if (!title.trim()) return

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        dueDate: dueDate || null,
      }),
    })

    if (!res.ok) return

    setTitle('')
    setDueDate('')
    load()
  }

  const toggle = async (t: Task) => {
    await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: t.id,
        completed: !t.completed,
      }),
    })
    load()
  }

  const remove = async (id: string) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  if (status === "loading") {
    return <p className="p-10">Loading...</p>
  }

  return (
    <main className="mx-auto max-w-xl p-10">
      <h1 className="mb-6 text-3xl font-bold">📚 Study Planner</h1>

      <div className="mb-6 flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="New task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded border px-3 py-2"
        />

        <button
          className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-500 hover:text-white transition"
          onClick={add}
        >
          Add
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded bg-black px-4 py-2 text-white hover:bg-pink-300 hover:text-black transition"
        >
          Logout
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map(t => {
          const daysLeft = t.dueDate ? daysUntil(t.dueDate) : null

          const label =
            daysLeft === null
              ? null
              : daysLeft < 0
                ? 'Overdue'
                : daysLeft === 0
                  ? 'Today'
                  : `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`

          return (
            <li
              key={t.id}
              className="flex items-start gap-3 rounded-lg border p-4"
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t)}
                className="mt-1 h-5 w-5 accent-black"
              />

              <div className="flex-1">
                <div className={t.completed ? 'line-through text-zinc-400' : 'text-zinc-800'}>
                  {t.title}
                </div>

                {t.dueDate && (
                  <div className="mt-1 text-xs text-zinc-600">
                    {new Date(t.dueDate).toLocaleDateString()} • {label}
                  </div>
                )}
              </div>

              <button
                onClick={() => remove(t.id)}
                className="text-sm text-zinc-400 hover:text-red-500"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

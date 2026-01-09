export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { prisma } from "../../lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

/* GET TASKS */
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: [
      { completed: "asc" },
      { dueDate: "asc" },
      { createdAt: "desc" },
    ],
  })

  return NextResponse.json(tasks)
}

/* CREATE TASK */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, dueDate } = await req.json()

  const task = await prisma.task.create({
    data: {
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: session.user.id, // ✅ ACUM EXISTĂ
    },
  })

  return NextResponse.json(task)
}

/* TOGGLE COMPLETE */
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, completed } = await req.json()

  const task = await prisma.task.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: { completed },
  })

  return NextResponse.json(task)
}

/* DELETE TASK */
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await req.json()

  await prisma.task.delete({
    where: {
      id,
      userId: session.user.id,
    },
  })

  return NextResponse.json({ ok: true })
}

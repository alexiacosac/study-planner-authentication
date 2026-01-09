import { prisma } from "../../lib/prisma"
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const hashed = await bcryptjs.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashed,
    },
  })

  return NextResponse.json({ ok: true })
}

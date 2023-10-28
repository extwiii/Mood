import { analyzeEntry } from '@/util/ai'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserFromClerkID()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  })

  return NextResponse.json({ data: { id: params.id } })
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { updates } = await request.json()
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: updates,
  })

  const analysis = await analyzeEntry(entry)
  const savedAnalysis = await prisma.entryAnalysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: { ...analysis },
    create: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  })

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}

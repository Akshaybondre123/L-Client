import { NextResponse } from "next/server"
import type { Case } from "@/types/case"

// Mock database - this would be imported from a shared location in a real app
const cases: Case[] = [
  {
    id: "1",
    caseNumber: "C-1021",
    clientId: "c1",
    clientName: "Bit-na",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    lawyerId: "l1",
    lawyerName: "Hye-kyung",
    status: "active",
    createdAt: "Jan 10, 2024",
    description: "Family dispute regarding property inheritance",
    caseType: "Family Law",
    court: "District Court",
    nextHearing: "2025-06-15",
  },
  // Add more mock data as needed
]

// GET /api/cases/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const caseItem = cases.find((c) => c.id === id)

  if (!caseItem) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  return NextResponse.json(caseItem)
}

// PATCH /api/cases/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()
  const caseIndex = cases.findIndex((c) => c.id === id)

  if (caseIndex === -1) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  // Update the case
  cases[caseIndex] = {
    ...cases[caseIndex],
    ...body,
  }

  return NextResponse.json(cases[caseIndex])
}

// DELETE /api/cases/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const caseIndex = cases.findIndex((c) => c.id === id)

  if (caseIndex === -1) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  // Remove the case
  cases.splice(caseIndex, 1)

  return new Response(null, { status: 204 })
}

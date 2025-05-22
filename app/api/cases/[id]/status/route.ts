import { NextResponse } from "next/server"
import type { Case, CaseStatus } from "@/types/case"

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
  },
  // Add more mock data as needed
]

// PATCH /api/cases/[id]/status
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()
  const caseIndex = cases.findIndex((c) => c.id === id)

  if (caseIndex === -1) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  if (!body.status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 })
  }

  // Update the case status
  cases[caseIndex].status = body.status as CaseStatus

  return NextResponse.json(cases[caseIndex])
}

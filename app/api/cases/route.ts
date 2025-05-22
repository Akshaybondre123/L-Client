import { NextResponse } from "next/server"
import type { Case } from "@/types/case"

// Mock database
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
  {
    id: "2",
    caseNumber: "C-1021",
    clientId: "c1",
    clientName: "Bit-na",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    lawyerId: "l1",
    lawyerName: "Hye-kyung",
    status: "in progress",
    createdAt: "Jan 10, 2024",
    description: "Contract dispute with employer",
    caseType: "Employment Law",
    court: "Labor Court",
    nextHearing: "2025-06-20",
  },
  // Add more mock data as needed
]

// GET /api/cases
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const status = searchParams.get("status")
  const lawyerId = searchParams.get("lawyerId")

  let filteredCases = [...cases]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredCases = filteredCases.filter(
      (c) =>
        c.clientName.toLowerCase().includes(searchLower) ||
        c.lawyerName.toLowerCase().includes(searchLower) ||
        c.caseNumber.toLowerCase().includes(searchLower),
    )
  }

  if (status) {
    filteredCases = filteredCases.filter((c) => c.status === status)
  }

  if (lawyerId) {
    filteredCases = filteredCases.filter((c) => c.lawyerId === lawyerId)
  }

  return NextResponse.json(filteredCases)
}

// POST /api/cases
export async function POST(request: Request) {
  const body = await request.json()

  // Validate the request body
  if (!body.clientId || !body.lawyerId || !body.status) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Create a new case
  const newCase: Case = {
    id: Math.random().toString(36).substring(2, 9), // Generate a random ID
    caseNumber: `C-${Math.floor(1000 + Math.random() * 9000)}`,
    clientId: body.clientId,
    clientName: body.clientName,
    clientAvatar: body.clientAvatar || "/placeholder.svg?height=40&width=40",
    lawyerId: body.lawyerId,
    lawyerName: body.lawyerName,
    status: body.status,
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    description: body.description,
    caseType: body.caseType,
    court: body.court,
    nextHearing: body.nextHearing,
  }

  // Add to the "database"
  cases.push(newCase)

  return NextResponse.json(newCase, { status: 201 })
}

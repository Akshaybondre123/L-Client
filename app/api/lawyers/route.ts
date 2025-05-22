import { NextResponse } from "next/server"
import type { Lawyer } from "@/types/lawyer"

// Mock database
const lawyers: Lawyer[] = [
  {
    id: "1",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "2",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "pending",
    joined: "Jan 10, 2024",
  },
  // Add more mock data as needed
]

// GET /api/lawyers
export async function GET() {
  return NextResponse.json(lawyers)
}

// POST /api/lawyers
export async function POST(request: Request) {
  const body = await request.json()

  // Validate the request body
  if (!body.name || !body.specialization || !body.mode || !body.status) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Create a new lawyer
  const newLawyer: Lawyer = {
    id: Math.random().toString(36).substring(2, 9), // Generate a random ID
    name: body.name,
    avatar: body.avatar || "/placeholder.svg?height=40&width=40",
    specialization: body.specialization,
    requestedDate: body.requestedDate || new Date().toISOString(),
    mode: body.mode,
    status: body.status,
    joined: body.joined || new Date().toLocaleDateString(),
  }

  // Add to the "database"
  lawyers.push(newLawyer)

  return NextResponse.json(newLawyer, { status: 201 })
}

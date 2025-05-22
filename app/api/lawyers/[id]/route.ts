import { NextResponse } from "next/server"
import type { Lawyer } from "@/types/lawyer"

// Mock database - this would be imported from a shared location in a real app
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
    experience: "Experienced civil and criminal lawyer with 10+ years of practice in high court and district courts.",
    email: "xxxxxxxxxx@gmail.com",
    address: "102 304 Sujik-ro 3-gil 23, ongno-gu",
    phone: "XX 12345678900",
    totalClients: 36,
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
    experience: "Experienced civil and criminal lawyer with 8+ years of practice in family court.",
    email: "xxxxxxxxxx@gmail.com",
    address: "102 304 Sujik-ro 3-gil 23, ongno-gu",
    phone: "XX 12345678900",
    totalClients: 24,
  },
  // Add more mock data as needed
]

// GET /api/lawyers/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const lawyer = lawyers.find((l) => l.id === id)

  if (!lawyer) {
    return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
  }

  return NextResponse.json(lawyer)
}

// PATCH /api/lawyers/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()
  const lawyerIndex = lawyers.findIndex((l) => l.id === id)

  if (lawyerIndex === -1) {
    return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
  }

  // Update the lawyer
  lawyers[lawyerIndex] = {
    ...lawyers[lawyerIndex],
    ...body,
  }

  return NextResponse.json(lawyers[lawyerIndex])
}

// DELETE /api/lawyers/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const lawyerIndex = lawyers.findIndex((l) => l.id === id)

  if (lawyerIndex === -1) {
    return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
  }

  // Remove the lawyer
  lawyers.splice(lawyerIndex, 1)

  return new Response(null, { status: 204 })
}

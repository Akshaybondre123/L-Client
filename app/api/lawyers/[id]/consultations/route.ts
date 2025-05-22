import { NextResponse } from "next/server"

// POST /api/lawyers/[id]/consultations
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const lawyerId = params.id
  const body = await request.json()

  // Validate the request body
  if (!body.date || !body.time || !body.mode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // In a real app, this would save the consultation request to a database
  // For now, just return a success response
  return NextResponse.json({
    success: true,
    message: "Consultation request sent successfully",
    data: {
      lawyerId,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  })
}

// GET /api/lawyers/[id]/consultations
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const lawyerId = params.id

  // In a real app, this would fetch consultations from a database
  // For now, just return mock data
  return NextResponse.json([
    {
      id: "1",
      lawyerId,
      date: "2025-06-01",
      time: "10:00 AM",
      mode: "Video",
      status: "scheduled",
      createdAt: "2025-05-20T10:30:00Z",
    },
    {
      id: "2",
      lawyerId,
      date: "2025-05-25",
      time: "2:00 PM",
      mode: "In-person",
      status: "completed",
      createdAt: "2025-05-15T14:20:00Z",
    },
  ])
}

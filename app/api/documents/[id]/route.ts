import { NextResponse } from "next/server"
import type { Document } from "@/types/document"

// Mock database - this would be imported from a shared location in a real app
const documents: Document[] = [
  {
    id: "1",
    name: "Agreement.pdf",
    uploadedBy: "Client",
    uploadDate: "18/02/2025",
    summary: "Property sale agreement summary",
    status: "Approved",
    fileType: "application/pdf",
  },
  // Add more mock data as needed
]

// GET /api/documents/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const document = documents.find((d) => d.id === id)

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  return NextResponse.json(document)
}

// PATCH /api/documents/[id]
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await request.json()
  const documentIndex = documents.findIndex((d) => d.id === id)

  if (documentIndex === -1) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  // Update the document
  documents[documentIndex] = {
    ...documents[documentIndex],
    ...body,
  }

  return NextResponse.json(documents[documentIndex])
}

// DELETE /api/documents/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const documentIndex = documents.findIndex((d) => d.id === id)

  if (documentIndex === -1) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  // Remove the document
  documents.splice(documentIndex, 1)

  return new Response(null, { status: 204 })
}

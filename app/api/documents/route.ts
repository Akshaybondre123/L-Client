import { NextResponse } from "next/server"
import type { Document } from "@/types/document"

// Mock database
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
  {
    id: "2",
    name: "ID_Proof.jpg",
    uploadedBy: "Client",
    uploadDate: "18/02/2025",
    summary: "Aadhaar card for verification",
    status: "Pending",
    fileType: "image/jpeg",
  },
  {
    id: "3",
    name: "LegalNotice.docx",
    uploadedBy: "Lawyer",
    uploadDate: "18/02/2025",
    summary: "Notice drafted for rental dispute",
    status: "Approved",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  // Add more mock data as needed
]

// GET /api/documents
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const status = searchParams.get("status")
  const uploadedBy = searchParams.get("uploadedBy")

  let filteredDocuments = [...documents]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredDocuments = filteredDocuments.filter(
      (d) => d.name.toLowerCase().includes(searchLower) || d.summary.toLowerCase().includes(searchLower),
    )
  }

  if (status) {
    filteredDocuments = filteredDocuments.filter((d) => d.status === status)
  }

  if (uploadedBy) {
    filteredDocuments = filteredDocuments.filter((d) => d.uploadedBy === uploadedBy)
  }

  return NextResponse.json(filteredDocuments)
}

// POST /api/documents
export async function POST(request: Request) {
  const body = await request.json()

  // Validate the request body
  if (!body.name || !body.uploadedBy || !body.summary || !body.status) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Create a new document
  const newDocument: Document = {
    id: Math.random().toString(36).substring(2, 9), // Generate a random ID
    name: body.name,
    uploadedBy: body.uploadedBy,
    uploadDate: new Date().toLocaleDateString("en-GB"),
    summary: body.summary,
    status: body.status,
    fileType: body.fileType || "",
    fileSize: body.fileSize,
    fileUrl: body.fileUrl,
  }

  // Add to the "database"
  documents.push(newDocument)

  return NextResponse.json(newDocument, { status: 201 })
}

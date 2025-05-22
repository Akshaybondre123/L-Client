import type { Document, DocumentFilterParams, DocumentStatus } from "@/types/document"

// This is a mock service that would be replaced with actual API calls in a real application
export class DocumentService {
  // Get all documents with optional filtering
  static async getDocuments(filters?: DocumentFilterParams): Promise<Document[]> {
    // In a real app, this would be an API call with query params
    // return await fetch('/api/documents?' + new URLSearchParams(filters)).then(res => res.json())

    // Mock data for demonstration
    const mockDocuments: Document[] = [
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
      {
        id: "4",
        name: "Agreement.pdf",
        uploadedBy: "Client",
        uploadDate: "18/02/2025",
        summary: "Property sale agreement summary",
        status: "Approved",
        fileType: "application/pdf",
      },
      {
        id: "5",
        name: "Agreement.pdf",
        uploadedBy: "Lawyer",
        uploadDate: "18/02/2025",
        summary: "Property sale agreement summary",
        status: "Approved",
        fileType: "application/pdf",
      },
      {
        id: "6",
        name: "Agreement.pdf",
        uploadedBy: "Client",
        uploadDate: "18/02/2025",
        summary: "Property sale agreement summary",
        status: "Approved",
        fileType: "application/pdf",
      },
    ]

    // Apply filters if provided
    let filteredDocuments = [...mockDocuments]

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredDocuments = filteredDocuments.filter(
          (d) => d.name.toLowerCase().includes(searchLower) || d.summary.toLowerCase().includes(searchLower),
        )
      }

      if (filters.status) {
        filteredDocuments = filteredDocuments.filter((d) => d.status === filters.status)
      }

      if (filters.uploadedBy) {
        filteredDocuments = filteredDocuments.filter((d) => d.uploadedBy === filters.uploadedBy)
      }

      // Date filtering would be implemented here
    }

    return filteredDocuments
  }

  // Get a document by ID
  static async getDocumentById(id: string): Promise<Document | null> {
    // In a real app, this would be an API call
    // return await fetch(`/api/documents/${id}`).then(res => res.json())

    const documents = await this.getDocuments()
    return documents.find((d) => d.id === id) || null
  }

  // Add a new document
  static async addDocument(document: Omit<Document, "id">): Promise<Document> {
    // In a real app, this would be an API call
    // return await fetch('/api/documents', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(document)
    // }).then(res => res.json())

    // For now, just return a mock response with a generated ID
    return {
      ...document,
      id: Math.random().toString(),
    }
  }

  // Update a document
  static async updateDocument(id: string, document: Partial<Document>): Promise<Document | null> {
    // In a real app, this would be an API call
    // return await fetch(`/api/documents/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(document)
    // }).then(res => res.json())

    const documents = await this.getDocuments()
    const documentIndex = documents.findIndex((d) => d.id === id)

    if (documentIndex === -1) {
      return null
    }

    const updatedDocument = {
      ...documents[documentIndex],
      ...document,
    }

    // In a real app, this would update the database
    // For now, just return the updated document
    return updatedDocument
  }

  // Update document status
  static async updateDocumentStatus(id: string, status: DocumentStatus): Promise<Document | null> {
    return this.updateDocument(id, { status })
  }

  // Delete a document
  static async deleteDocument(id: string): Promise<boolean> {
    // In a real app, this would be an API call
    // return await fetch(`/api/documents/${id}`, {
    //   method: 'DELETE'
    // }).then(() => true).catch(() => false)

    // For now, just return success
    return true
  }
}

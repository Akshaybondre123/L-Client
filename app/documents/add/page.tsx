"use client"

import { AddDocumentForm } from "@/components/documents/add-document-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Document } from "@/types/document"
import { DocumentService } from "@/services/document-service"

export default function AddDocumentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddDocument = async (document: Document) => {
    try {
      setIsSubmitting(true)
      setError(null)
      // In a real app, this would add the document to the database
      await DocumentService.addDocument(document)
      // Redirect back to the documents page
      router.push("/documents")
    } catch (err) {
      console.error("Error adding document:", err)
      setError("Failed to add document. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    // Redirect back to the documents page
    router.push("/documents")
  }

  return (
    <AddDocumentForm
      onAddDocument={handleAddDocument}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      error={error}
    />
  )
}

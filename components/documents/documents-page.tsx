"use client"

import { useState, useEffect } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DocumentHeader } from "@/components/documents/document-header"
import { DocumentFilter } from "@/components/documents/document-filter"
import { DocumentTable } from "@/components/documents/document-table"
import { ViewDocumentDialog } from "@/components/documents/view-document-dialog"
import { EditDocumentDialog } from "@/components/documents/edit-document-dialog"
import { DocumentHistoryDialog } from "@/components/documents/document-history-dialog"
import { DocumentService } from "@/services/document-service"
import type { Document, DocumentStatus } from "@/types/document"
import { useRouter } from "next/navigation"

export function DocumentsPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dialog states
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)

  // Fetch documents on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true)
        const data = await DocumentService.getDocuments()
        setDocuments(data)
        setFilteredDocuments(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch documents. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  // Filter documents when search query or status filter changes
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filters = {
          search: searchQuery,
          status: statusFilter,
        }
        const filteredData = await DocumentService.getDocuments(filters)
        setFilteredDocuments(filteredData)
      } catch (err) {
        console.error("Error applying filters:", err)
      }
    }

    applyFilters()
  }, [searchQuery, statusFilter])

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting documents:", filteredDocuments)
    alert("Export functionality would be implemented here")
  }

  const handleAddDocument = () => {
    router.push("/documents/add")
  }

  const handleUpdateDocument = async (document: Document) => {
    try {
      const updatedDocument = await DocumentService.updateDocument(document.id, document)
      if (updatedDocument) {
        setDocuments((prev) => prev.map((d) => (d.id === document.id ? updatedDocument : d)))
        setFilteredDocuments((prev) => prev.map((d) => (d.id === document.id ? updatedDocument : d)))
      }
    } catch (err) {
      console.error("Error updating document:", err)
      alert("Failed to update document")
    }
  }

  const handleViewDocument = (document: Document) => {
    try {
      setSelectedDocument(document)
      setViewDialogOpen(true)
    } catch (error) {
      console.error("Error viewing document:", error)
      alert("Unable to view document. Please try again.")
    }
  }

  const handleEditDocument = (document: Document) => {
    try {
      setSelectedDocument(document)
      setEditDialogOpen(true)
    } catch (error) {
      console.error("Error editing document:", error)
      alert("Unable to edit document. Please try again.")
    }
  }

  const handleHistoryDocument = (document: Document) => {
    try {
      setSelectedDocument(document)
      setHistoryDialogOpen(true)
    } catch (error) {
      console.error("Error viewing document history:", error)
      alert("Unable to view document history. Please try again.")
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full max-w-full overflow-x-hidden">
              <div className="flex justify-between items-center mb-6">
                <DocumentHeader />
              </div>

              <DocumentFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onExport={handleExport}
                onAddDocument={handleAddDocument}
                className="w-full"
              />

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse">Loading documents...</div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
              ) : (
                <DocumentTable
                  documents={filteredDocuments}
                  onView={handleViewDocument}
                  onEdit={handleEditDocument}
                  onHistory={handleHistoryDocument}
                />
              )}

              {/* Dialogs */}
              <ViewDocumentDialog document={selectedDocument} open={viewDialogOpen} onOpenChange={setViewDialogOpen} />
              <EditDocumentDialog
                document={selectedDocument}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onUpdateDocument={handleUpdateDocument}
              />
              <DocumentHistoryDialog
                document={selectedDocument}
                open={historyDialogOpen}
                onOpenChange={setHistoryDialogOpen}
              />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

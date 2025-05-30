"use client"

import { useRef, useEffect } from "react"
import { Eye, Edit, Clock } from "lucide-react"
import type { Document } from "@/types/document"
import { DocumentStatusBadge } from "@/components/ui/document-status-badge"
import { Button } from "@/components/ui/button"

interface DocumentTableProps {
  documents: Document[]
  onView: (document: Document) => void
  onEdit: (document: Document) => void
  onHistory: (document: Document) => void
}

export function DocumentTable({ documents, onView, onEdit, onHistory }: DocumentTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let isDown = false
    let startX: number
    let scrollLeft: number

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true
      container.classList.add("cursor-grabbing")
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    }

    const handleMouseLeave = () => {
      isDown = false
      container.classList.remove("cursor-grabbing")
    }

    const handleMouseUp = () => {
      isDown = false
      container.classList.remove("cursor-grabbing")
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 1.5 // Adjust scroll speed here
      container.scrollLeft = scrollLeft - walk
    }

    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return "📄"
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️"
      case "doc":
      case "docx":
        return "📝"
      default:
        return "📁"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden max-w-full">
      <div ref={scrollRef} className="overflow-x-auto w-full cursor-grab">
        {/* Desktop view */}
        <div className="hidden md:block">
          <table className="w-full table-auto min-w-[800px]">
            <thead>
              <tr className="text-sm text-gray-500 bg-gray-50">
                <th className="font-normal text-left py-3 px-6 border-b">Document Name</th>
                <th className="font-normal text-left py-3 px-6 border-b">Uploaded By</th>
                <th className="font-normal text-left py-3 px-6 border-b">Upload Date</th>
                <th className="font-normal text-left py-3 px-6 border-b">Summary</th>
                <th className="font-normal text-left py-3 px-6 border-b">Status</th>
                <th className="font-normal text-left py-3 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document, index) => (
                <tr key={document.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span>{getFileIcon(document.name)}</span>
                      <span className="truncate">{document.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{document.uploadedBy}</td>
                  <td className="py-4 px-6">{document.uploadDate}</td>
                  <td className="py-4 px-6 max-w-xs">
                    <div className="truncate">{document.summary}</div>
                  </td>
                  <td className="py-4 px-6">
                    <DocumentStatusBadge status={document.status} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(document)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(document)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onHistory(document)}>
                        <Clock className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          {documents.map((document, index) => (
            <div key={document.id} className={`border-b p-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getFileIcon(document.name)}</span>
                  <div>
                    <h3 className="font-medium truncate max-w-[200px]">{document.name}</h3>
                    <p className="text-xs text-gray-500">{document.uploadDate}</p>
                  </div>
                </div>
                <DocumentStatusBadge status={document.status} />
              </div>

              <div className="text-sm mb-3">
                <p className="text-gray-500 mb-1">Uploaded by: {document.uploadedBy}</p>
                <p className="text-gray-600 line-clamp-2">{document.summary}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8" onClick={() => onView(document)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8" onClick={() => onEdit(document)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8" onClick={() => onHistory(document)}>
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

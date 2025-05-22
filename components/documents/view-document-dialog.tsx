"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DocumentStatusBadge } from "@/components/ui/document-status-badge"
import type { Document } from "@/types/document"
import { FileText, Download, Calendar, User } from "lucide-react"

interface ViewDocumentDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewDocumentDialog({ document, open, onOpenChange }: ViewDocumentDialogProps) {
  const handleDownload = () => {
    // In a real app, this would download the actual file
    if (document?.fileUrl) {
      // Use a try-catch to handle potential errors
      try {
        window.open(document.fileUrl, "_blank")
      } catch (error) {
        console.error("Error opening document:", error)
        alert("Unable to download document. The file may not be available.")
      }
    } else {
      alert("Document download functionality would be implemented here")
    }
  }

  if (!document) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Document Details</DialogTitle>
          <DialogDescription>View document information and download file.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{document.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <DocumentStatusBadge status={document.status} />
                <span className="text-sm text-gray-500">
                  {document.fileSize ? `${(document.fileSize / 1024 / 1024).toFixed(2)} MB` : "Size not available"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Uploaded By</p>
                <p className="text-sm text-gray-600">{document.uploadedBy}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Upload Date</p>
                <p className="text-sm text-gray-600">{document.uploadDate}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Summary</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{document.summary}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" /> Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

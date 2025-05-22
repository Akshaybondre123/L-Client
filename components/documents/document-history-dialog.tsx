"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Document } from "@/types/document"
import { DocumentStatusBadge } from "@/components/ui/document-status-badge"

interface DocumentHistoryDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentHistoryDialog({ document, open, onOpenChange }: DocumentHistoryDialogProps) {
  if (!document) {
    return null
  }

  // Mock history data - in a real app, this would come from the backend
  const historyItems = [
    {
      id: 1,
      date: document.uploadDate,
      action: "Document uploaded",
      user: document.uploadedBy,
      status: document.status,
    },
    {
      id: 2,
      date: "19/02/2025",
      action: "Document reviewed",
      user: "Lawyer",
      status: "Pending",
    },
    {
      id: 3,
      date: "20/02/2025",
      action: "Status updated",
      user: "Lawyer",
      status: document.status,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Document History</DialogTitle>
          <DialogDescription>View the history of changes for this document.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📄</span>
            </div>
            <div>
              <h3 className="font-medium">{document.name}</h3>
              <p className="text-sm text-gray-500">
                Current status: <DocumentStatusBadge status={document.status} />
              </p>
            </div>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-4 gap-4 p-3 border-b bg-gray-50 text-sm font-medium">
              <div>Date</div>
              <div>Action</div>
              <div>User</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {historyItems.map((item) => (
                <div key={item.id} className="grid grid-cols-4 gap-4 p-3 text-sm">
                  <div>{item.date}</div>
                  <div>{item.action}</div>
                  <div>{item.user}</div>
                  <div>
                    <DocumentStatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export interface Document {
  id: string
  name: string
  uploadedBy: "Client" | "Lawyer"
  uploadDate: string
  summary: string
  status: "Approved" | "Pending" | "Rejected"
  fileType: string
  fileSize?: number
  fileUrl?: string
}

export type DocumentStatus = "Approved" | "Pending" | "Rejected"

export interface DocumentFilterParams {
  search?: string
  status?: DocumentStatus | null
  startDate?: string
  endDate?: string
  uploadedBy?: "Client" | "Lawyer" | null
}

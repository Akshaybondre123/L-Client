export interface Case {
  id: string
  caseNumber: string
  clientId: string
  clientName: string
  clientAvatar: string
  lawyerId: string
  lawyerName: string
  status: "active" | "in progress" | "closed" | "pending"
  createdAt: string
  description?: string
  caseType?: string
  court?: string
  nextHearing?: string
  documents?: string[]
}

export type CaseStatus = "active" | "in progress" | "closed" | "pending"

export interface CaseFilterParams {
  search?: string
  status?: CaseStatus | null
  startDate?: string
  endDate?: string
  lawyerId?: string
}

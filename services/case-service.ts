import type { Case, CaseFilterParams, CaseStatus } from "@/types/case"

// This is a mock service that would be replaced with actual API calls in a real application
export class CaseService {
  // Get all cases with optional filtering
  static async getCases(filters?: CaseFilterParams): Promise<Case[]> {
    // In a real app, this would be an API call with query params
    // return await fetch('/api/cases?' + new URLSearchParams(filters)).then(res => res.json())

    // Mock data for demonstration
    const mockCases: Case[] = [
      {
        id: "1",
        caseNumber: "C-1021",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "active",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "2",
        caseNumber: "C-1021",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "in progress",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "3",
        caseNumber: "C-1021",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l2",
        lawyerName: "Sang-mi",
        status: "active",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "4",
        caseNumber: "C-1021",
        clientId: "c2",
        clientName: "Seong-ja",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "active",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "5",
        caseNumber: "C-1021",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "in progress",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "6",
        caseNumber: "C-1021",
        clientId: "c2",
        clientName: "Seong-ja",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "active",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "7",
        caseNumber: "C-1021",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "in progress",
        createdAt: "Jan 10, 2024",
      },
      {
        id: "8",
        caseNumber: "C-1021",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        status: "active",
        createdAt: "Jan 10, 2024",
      },
    ]

    // Apply filters if provided
    let filteredCases = [...mockCases]

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredCases = filteredCases.filter(
          (c) =>
            c.clientName.toLowerCase().includes(searchLower) ||
            c.lawyerName.toLowerCase().includes(searchLower) ||
            c.caseNumber.toLowerCase().includes(searchLower),
        )
      }

      if (filters.status) {
        filteredCases = filteredCases.filter((c) => c.status === filters.status)
      }

      if (filters.lawyerId) {
        filteredCases = filteredCases.filter((c) => c.lawyerId === filters.lawyerId)
      }

      // Date filtering would be implemented here
    }

    return filteredCases
  }

  // Get a case by ID
  static async getCaseById(id: string): Promise<Case | null> {
    // In a real app, this would be an API call
    // return await fetch(`/api/cases/${id}`).then(res => res.json())

    const cases = await this.getCases()
    return cases.find((c) => c.id === id) || null
  }

  // Update case status
  static async updateCaseStatus(id: string, status: CaseStatus): Promise<Case | null> {
    // In a real app, this would be an API call
    // return await fetch(`/api/cases/${id}/status`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status })
    // }).then(res => res.json())

    const cases = await this.getCases()
    const caseIndex = cases.findIndex((c) => c.id === id)

    if (caseIndex === -1) {
      return null
    }

    const updatedCase = {
      ...cases[caseIndex],
      status,
    }

    // In a real app, this would update the database
    // For now, just return the updated case
    return updatedCase
  }

  // Get case statistics
  static async getCaseStatistics(): Promise<{ active: number; inProgress: number; closed: number; pending: number }> {
    const cases = await this.getCases()

    return {
      active: cases.filter((c) => c.status === "active").length,
      inProgress: cases.filter((c) => c.status === "in progress").length,
      closed: cases.filter((c) => c.status === "closed").length,
      pending: cases.filter((c) => c.status === "pending").length,
    }
  }
}

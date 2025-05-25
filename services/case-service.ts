import type { Case, CaseFilterParams, CaseStatus } from "@/types/case"

// This is a mock service that would be replaced with actual API calls in a real application
export class CaseService {
  // Get all cases with optional filtering
  static async getCases(filters?: CaseFilterParams): Promise<Case[]> {
    // In a real app, this would be an API call with query params
    // return await fetch('/api/cases?' + new URLSearchParams(filters)).then(res => res.json())

    // Mock data for demonstration with Korean legal format
    const mockCases: Case[] = [
      {
        id: "1",
        caseYear: "2025",
        caseCode: "고합",
        caseSerialNumber: "1827",
        caseNumber: "2025-고합-1827",
        litigantType: "원고",
        litigantName: "김철수",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "부동산 매매계약 분쟁",
        caseType: "민사소송",
        court: "서울중앙지방법원",
        status: "active",
        createdAt: "Jan 10, 2024",
        description: "부동산 매매계약 관련 분쟁 사건",
        recentUpdate: "변론준비기일 진행 완료",
        nextHearingDates: [
          {
            id: "h1",
            date: "2025-06-15",
            time: "10:00",
            description: "변론기일",
          },
        ],
      },
      {
        id: "2",
        caseYear: "2025",
        caseCode: "민사",
        caseSerialNumber: "2341",
        caseNumber: "2025-민사-2341",
        litigantType: "피고",
        litigantName: "박영희",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "임금체불 소송",
        caseType: "노동소송",
        court: "서울동부지방법원",
        status: "in progress",
        createdAt: "Jan 10, 2024",
        description: "임금체불 관련 소송",
        recentUpdate: "증거서류 제출 완료",
        nextHearingDates: [
          {
            id: "h2",
            date: "2025-06-20",
            time: "14:00",
            description: "증인신문",
          },
          {
            id: "h3",
            date: "2025-07-05",
            time: "10:30",
            description: "변론종결",
          },
        ],
      },
      {
        id: "3",
        caseYear: "2024",
        caseCode: "가사",
        caseSerialNumber: "1523",
        caseNumber: "2024-가사-1523",
        litigantType: "원고",
        litigantName: "이민수",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l2",
        lawyerName: "Sang-mi",
        caseTitle: "이혼 및 재산분할",
        caseType: "가사소송",
        court: "서울가정법원",
        status: "active",
        createdAt: "Jan 10, 2024",
        description: "이혼 및 재산분할 관련 사건",
        recentUpdate: "조정 진행 중",
        nextHearingDates: [
          {
            id: "h4",
            date: "2025-06-25",
            time: "11:00",
            description: "조정기일",
          },
        ],
      },
      {
        id: "4",
        caseYear: "2025",
        caseCode: "형사",
        caseSerialNumber: "987",
        caseNumber: "2025-형사-987",
        litigantType: "피고",
        litigantName: "최영수",
        clientId: "c2",
        clientName: "Seong-ja",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "사기 혐의",
        caseType: "형사소송",
        court: "서울중앙지방법원",
        status: "active",
        createdAt: "Jan 10, 2024",
        description: "사기 혐의 관련 형사사건",
        recentUpdate: "공판준비기일 지정",
        nextHearingDates: [
          {
            id: "h5",
            date: "2025-07-10",
            time: "09:30",
            description: "공판기일",
          },
        ],
      },
      {
        id: "5",
        caseYear: "2025",
        caseCode: "행정",
        caseSerialNumber: "456",
        caseNumber: "2025-행정-456",
        litigantType: "원고",
        litigantName: "정미영",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "건축허가 취소처분 취소",
        caseType: "행정소송",
        court: "서울행정법원",
        status: "in progress",
        createdAt: "Jan 10, 2024",
        description: "건축허가 취소처분에 대한 취소소송",
        recentUpdate: "서면준비절차 진행 중",
        nextHearingDates: [],
      },
      {
        id: "6",
        caseYear: "2024",
        caseCode: "고단",
        caseSerialNumber: "3421",
        caseNumber: "2024-고단-3421",
        litigantType: "피고",
        litigantName: "한상철",
        clientId: "c2",
        clientName: "Seong-ja",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "폭행 혐의",
        caseType: "형사소송",
        court: "인천지방법원",
        status: "active",
        createdAt: "Jan 10, 2024",
        description: "폭행 혐의 관련 형사사건",
        recentUpdate: "1심 판결 선고 예정",
        nextHearingDates: [
          {
            id: "h6",
            date: "2025-06-30",
            time: "15:00",
            description: "선고기일",
          },
        ],
      },
      {
        id: "7",
        caseYear: "2025",
        caseCode: "특허",
        caseSerialNumber: "234",
        caseNumber: "2025-특허-234",
        litigantType: "원고",
        litigantName: "김기술",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "특허권 침해금지",
        caseType: "특허소송",
        court: "특허법원",
        status: "in progress",
        createdAt: "Jan 10, 2024",
        description: "특허권 침해에 따른 금지청구 소송",
        recentUpdate: "기술설명회 실시",
        nextHearingDates: [
          {
            id: "h7",
            date: "2025-07-15",
            time: "13:30",
            description: "변론기일",
          },
        ],
      },
      {
        id: "8",
        caseYear: "2025",
        caseCode: "민사",
        caseSerialNumber: "5678",
        caseNumber: "2025-민사-5678",
        litigantType: "원고",
        litigantName: "이상호",
        clientId: "c1",
        clientName: "Bit-na",
        clientAvatar: "/placeholder.svg?height=40&width=40",
        lawyerId: "l1",
        lawyerName: "Hye-kyung",
        caseTitle: "손해배상청구",
        caseType: "민사소송",
        court: "부산지방법원",
        status: "active",
        createdAt: "Jan 10, 2024",
        description: "교통사고로 인한 손해배상청구 소송",
        recentUpdate: "감정인 선정 완료",
        nextHearingDates: [
          {
            id: "h8",
            date: "2025-08-01",
            time: "10:00",
            description: "감정인 신문",
          },
        ],
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
            c.caseNumber.toLowerCase().includes(searchLower) ||
            c.caseTitle?.toLowerCase().includes(searchLower) ||
            c.litigantName?.toLowerCase().includes(searchLower),
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
    const caseItem = cases.find((c) => c.id === id)

    if (!caseItem) {
      return null
    }

    // Add additional profile data if not present
    return {
      ...caseItem,
      description: caseItem.description || "",
      recentUpdate: caseItem.recentUpdate || "",
      nextHearingDates: caseItem.nextHearingDates || [],
    }
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

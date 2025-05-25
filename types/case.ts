export interface Case {
  id: string
  // Legal case format
  caseYear: string
  caseCode: string
  caseSerialNumber: string
  caseNumber: string // Will be formatted as "Year-Code-Serial"

  // Litigant information
  litigantType: "Plaintiff" | "Defendant"
  litigantName: string

  clientId: string
  clientName: string
  clientAvatar: string
  lawyerId: string
  lawyerName: string

  // Case details
  caseTitle: string
  caseType: "Criminal" | "Civil"
  court: string

  status: "active" | "in progress" | "closed" | "pending"
  createdAt: string
  description?: string

  // Multiple hearing dates
  nextHearingDates: HearingDate[]

  // Recent updates
  recentUpdate?: string

  documents?: CaseDocument[]
}

export interface HearingDate {
  id: string
  date: string
  time: string
  description?: string
}

export interface CaseDocument {
  id: string
  name: string
  type: string
  uploadDate: string
  fileUrl?: string
  fileSize?: number
}

export type CaseStatus = "active" | "in progress" | "closed" | "pending"

export interface CaseFilterParams {
  search?: string
  status?: CaseStatus | null
  startDate?: string
  endDate?: string
  lawyerId?: string
}

// Court and case code data from the provided dataset
export interface CourtData {
  court: string
  caseType: "Criminal" | "Civil"
  caseCode: string
}

// Criminal case codes
export const CRIMINAL_CASE_CODES = [
  "고",
  "고합",
  "형",
  "형사",
  "형제",
  "노",
  "노합",
  "도",
  "도합",
  "항",
  "항소",
  "항합",
  "재",
  "재항",
  "재합",
] as const

// Civil case codes
export const CIVIL_CASE_CODES = [
  "가",
  "가합",
  "가단",
  "가소",
  "가처",
  "카",
  "카합",
  "카단",
  "나",
  "나합",
  "나단",
  "바",
  "바합",
  "바단",
  "하",
  "마",
  "타",
  "타합",
  "타단",
] as const

// All courts from the dataset
export const COURTS = [
  "Seoul Central District Court",
  "Seoul Eastern District Court",
  "Seoul Western District Court",
  "Seoul Southern District Court",
  "Seoul Northern District Court",
  "Incheon District Court",
  "Suwon District Court",
  "Uijeongbu District Court",
  "Chuncheon District Court",
  "Cheongju District Court",
  "Daejeon District Court",
  "Daegu District Court",
  "Busan District Court",
  "Ulsan District Court",
  "Gwangju District Court",
  "Changwon District Court",
  "Jeju District Court",
  "Seoul High Court",
  "Daejeon High Court",
  "Daegu High Court",
  "Busan High Court",
  "Gwangju High Court",
] as const

// Case types
export const CASE_TYPES = ["Criminal", "Civil"] as const

export type CaseCode = (typeof CRIMINAL_CASE_CODES)[number] | (typeof CIVIL_CASE_CODES)[number]
export type Court = (typeof COURTS)[number]
export type CaseType = (typeof CASE_TYPES)[number]

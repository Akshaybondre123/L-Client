"use client"

import { useRouter } from "next/navigation"
import { useRef, useEffect, useState } from "react"
import type { Case } from "@/types/case"
import { StatusBadge } from "@/components/ui/status-badge"

interface MyCasesTableProps {
  cases: Case[]
}

export function MyCasesTable({ cases }: MyCasesTableProps) {
  const router = useRouter()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setStartX(e.pageX - container.offsetLeft)
      setScrollLeft(container.scrollLeft)
    }

    const handleMouseLeave = () => setIsDragging(false)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 1.5
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
  }, [isDragging, startX, scrollLeft])

  const handleCaseClick = (caseId: string) => {
    router.push(`/my-cases/${caseId}`)
  }

  const getNextHearingDate = (case_: Case) => {
    if (!case_.nextHearingDates?.length) return "No hearing scheduled"
    const sorted = case_.nextHearingDates
      .map((h) => new Date(h.date))
      .sort((a, b) => a.getTime() - b.getTime())
    return sorted[0].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getRecentUpdateDate = (case_: Case) => {
    const recent = case_.recentUpdate
    if (!recent) return "No recent updates"
    if (recent.includes("-") || recent.includes("/")) {
      const parsed = new Date(recent)
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      }
    }
    const fallback = new Date()
    fallback.setDate(fallback.getDate() - Math.floor(Math.random() * 30))
    return fallback.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden w-full">
      <div
        className="overflow-x-auto cursor-grab active:cursor-grabbing"
        ref={scrollContainerRef}
      >
        {/* Desktop */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 bg-gray-50 border-b">
                <th className="text-left py-3 px-4">Case ID</th>
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-left py-3 px-4">Case Title</th>
                <th className="text-left py-3 px-4">Lawyer</th>
                <th className="text-left py-3 px-4">Next Hearing</th>
                <th className="text-left py-3 px-4">Recent Update</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr
                  key={caseItem.id}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => handleCaseClick(caseItem.id)}
                >
                  <td className="py-3 px-4 text-sm text-gray-900">{caseItem.caseNumber}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={caseItem.clientAvatar || "/placeholder.svg"}
                          alt={caseItem.clientName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-900 truncate">{caseItem.clientName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 truncate">{caseItem.caseTitle || "No title"}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{caseItem.lawyerName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{getNextHearingDate(caseItem)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{getRecentUpdateDate(caseItem)}</td>
                  <td className="py-3 px-4"><StatusBadge status={caseItem.status} /></td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatCreatedDate(caseItem.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet */}
        <div className="hidden md:block lg:hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-medium text-gray-500 bg-gray-50 border-b">
                <th className="py-3 px-3">Case & Client</th>
                <th className="py-3 px-3">Title</th>
                <th className="py-3 px-3">Lawyer</th>
                <th className="py-3 px-3">Hearing</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr
                  key={caseItem.id}
                  className={`cursor-pointer hover:bg-gray-50 border-b ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => handleCaseClick(caseItem.id)}
                >
                  <td className="py-3 px-3">
                    <div className="text-sm font-medium text-gray-900">{caseItem.caseNumber}</div>
                    <div className="text-xs text-gray-600">{caseItem.clientName}</div>
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-900 truncate">{caseItem.caseTitle || "No title"}</td>
                  <td className="py-3 px-3 text-sm text-gray-900">{caseItem.lawyerName}</td>
                  <td className="py-3 px-3 text-xs text-gray-600">{getNextHearingDate(caseItem)}</td>
                  <td className="py-3 px-3"><StatusBadge status={caseItem.status} /></td>
                  <td className="py-3 px-3 text-xs text-gray-600">{formatCreatedDate(caseItem.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => handleCaseClick(caseItem.id)}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <img
                    src={caseItem.clientAvatar || "/placeholder.svg"}
                    alt={caseItem.clientName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{caseItem.clientName}</h3>
                    <StatusBadge status={caseItem.status} />
                  </div>
                  <p className="text-xs text-gray-600">Case: {caseItem.caseNumber}</p>
                  <p className="text-sm font-medium text-gray-800 truncate mb-2">{caseItem.caseTitle || "No title"}</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                    <span>Lawyer: {caseItem.lawyerName}</span>
                    <span>Created: {formatCreatedDate(caseItem.createdAt)}</span>
                    <span>Next: {getNextHearingDate(caseItem)}</span>
                    <span>Update: {getRecentUpdateDate(caseItem)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import type { Case } from "@/types/case"
import { StatusBadge } from "@/components/ui/status-badge"

interface MyCasesTableProps {
  cases: Case[]
}

export function MyCasesTable({ cases }: MyCasesTableProps) {
  const router = useRouter()

  const handleCaseClick = (caseId: string) => {
    router.push(`/my-cases/${caseId}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden w-full max-w-none">
      <div className="overflow-x-auto w-full max-w-none">
        {/* Desktop view */}
        <div className="hidden md:block">
          <table className="w-full min-w-full table-fixed">
            <thead>
              <tr className="text-sm text-gray-500 bg-gray-50">
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Case ID</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/4">Client</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/4">Lawyer</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Status</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Created</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCaseClick(caseItem.id)}
                >
                  <td className="py-4 px-6">{caseItem.caseNumber}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={caseItem.clientAvatar || "/placeholder.svg"}
                          alt={caseItem.clientName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{caseItem.clientName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{caseItem.lawyerName}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={caseItem.status} />
                  </td>
                  <td className="py-4 px-6">{caseItem.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="border-b border-gray-100 p-4 cursor-pointer hover:bg-gray-50 last:border-b-0"
              onClick={() => handleCaseClick(caseItem.id)}
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={caseItem.clientAvatar || "/placeholder.svg"}
                    alt={caseItem.clientName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{caseItem.clientName}</h3>
                    <StatusBadge status={caseItem.status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Case: {caseItem.caseNumber}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Lawyer: {caseItem.lawyerName}</span>
                    <span>Created: {caseItem.createdAt}</span>
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

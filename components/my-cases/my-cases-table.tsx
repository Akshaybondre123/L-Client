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
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden w-full">
      <div className="overflow-x-auto w-full">
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
              className="border-b p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleCaseClick(caseItem.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={caseItem.clientAvatar || "/placeholder.svg"}
                      alt={caseItem.clientName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{caseItem.clientName}</h3>
                    <p className="text-sm text-gray-500">Case: {caseItem.caseNumber}</p>
                  </div>
                </div>
                <StatusBadge status={caseItem.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                <div>
                  <span className="text-gray-500">Lawyer:</span>
                  <span className="ml-1">{caseItem.lawyerName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-1">{caseItem.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

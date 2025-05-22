"use client"

import { useRouter } from "next/navigation"
import type { Lawyer } from "@/types/lawyer"
import { StatusBadge } from "@/components/ui/status-badge"

interface LawyersTableProps {
  lawyers: Lawyer[]
}

export function LawyersTable({ lawyers }: LawyersTableProps) {
  const router = useRouter()

  const handleLawyerClick = (lawyerId: string) => {
    router.push(`/lawyers/${lawyerId}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden w-full">
      <div className="overflow-x-auto w-full">
        {/* Desktop view */}
        <div className="hidden md:block">
          <table className="w-full min-w-full table-fixed">
            <thead>
              <tr className="text-sm text-gray-500 bg-gray-50">
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Lawyer name</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Specialization</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Requested Date & time</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/12">Mode</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/12">Status</th>
                <th className="font-normal text-left py-3 px-6 border-b w-1/6">Joined</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((lawyer, index) => (
                <tr
                  key={lawyer.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} cursor-pointer hover:bg-gray-100`}
                  onClick={() => handleLawyerClick(lawyer.id)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={lawyer.avatar || "/placeholder.svg"}
                          alt={lawyer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{lawyer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">{lawyer.specialization}</td>
                  <td className="py-4 px-6">{lawyer.requestedDate}</td>
                  <td className="py-4 px-6">{lawyer.mode}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={lawyer.status} />
                  </td>
                  <td className="py-4 px-6">{lawyer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          {lawyers.map((lawyer, index) => (
            <div
              key={lawyer.id}
              className="border-b p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => handleLawyerClick(lawyer.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={lawyer.avatar || "/placeholder.svg"}
                    alt={lawyer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{lawyer.name}</h3>
                  <p className="text-sm text-gray-500">{lawyer.specialization}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div>
                  <span className="text-gray-500">Requested:</span>
                  <span className="ml-1">{lawyer.requestedDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Mode:</span>
                  <span className="ml-1">{lawyer.mode}</span>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <span className="ml-1">
                    <StatusBadge status={lawyer.status} />
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Joined:</span>
                  <span className="ml-1">{lawyer.joined}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

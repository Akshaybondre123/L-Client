"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Search, Eye, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoConsultation {
  id: string
  lawyerName: string
  lawyerAvatar: string
  scheduledDateTime: string
  joinLink: string
  transcript: boolean
  status: "Confirmed" | "Pending" | "Cancelled"
}

export function VideoConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Mock data for video consultations
  const consultations: VideoConsultation[] = [
    {
      id: "1",
      lawyerName: "Mathilda Bell",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      scheduledDateTime: "11/10/2024 10:00 PM",
      joinLink: "meet.google.com/xxx",
      transcript: true,
      status: "Confirmed",
    },
    {
      id: "2",
      lawyerName: "Mathilda Bell",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      scheduledDateTime: "11/10/2024 10:00 PM",
      joinLink: "meet.google.com/xxx",
      transcript: true,
      status: "Confirmed",
    },
    {
      id: "3",
      lawyerName: "Mathilda Bell",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      scheduledDateTime: "11/10/2024 10:00 PM",
      joinLink: "meet.google.com/xxx",
      transcript: true,
      status: "Pending",
    },
    {
      id: "4",
      lawyerName: "Mathilda Bell",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      scheduledDateTime: "11/10/2024 10:00 PM",
      joinLink: "meet.google.com/xxx",
      transcript: true,
      status: "Confirmed",
    },
    {
      id: "5",
      lawyerName: "Mathilda Bell",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      scheduledDateTime: "11/10/2024 10:00 PM",
      joinLink: "meet.google.com/xxx",
      transcript: true,
      status: "Confirmed",
    },
  ]

  // Filter consultations based on search query and status filter
  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch = consultation.lawyerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? consultation.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting consultations:", filteredConsultations)
    alert("Export functionality would be implemented here")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-white">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full overflow-x-hidden flex-1">
              <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Video Consultations</h1>
                <p className="text-sm text-gray-500">Video Consultations list</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="bg-white">
                    Status
                  </Button>
                  <Button variant="outline" className="bg-white" onClick={handleExport}>
                    Export
                  </Button>
                </div>
              </div>

              {/* Desktop view */}
              <div className="bg-white rounded-lg shadow-sm border w-full flex-1 hidden md:block">
                <div className="overflow-x-auto w-full max-w-full">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="text-sm text-gray-500 bg-gray-50">
                        <th className="font-normal text-left py-3 px-4 border-b">Lawyer Name</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Scheduled date & time</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Join Link</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Transcript</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Status</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConsultations.map((consultation, index) => (
                        <tr
                          key={consultation.id}
                          className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={consultation.lawyerAvatar || "/placeholder.svg"}
                                  alt={consultation.lawyerName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span>{consultation.lawyerName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">{consultation.scheduledDateTime}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span>{consultation.joinLink}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <LinkIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                consultation.status === "Confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : consultation.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {consultation.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <LinkIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {filteredConsultations.map((consultation, index) => (
                  <div
                    key={consultation.id}
                    className={`rounded-lg shadow-sm border p-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={consultation.lawyerAvatar || "/placeholder.svg"}
                            alt={consultation.lawyerName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{consultation.lawyerName}</h3>
                          <p className="text-xs text-gray-500">{consultation.scheduledDateTime}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          consultation.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : consultation.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </div>

                    <div className="text-sm space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Join Link:</span>
                        <span className="font-medium">{consultation.joinLink}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

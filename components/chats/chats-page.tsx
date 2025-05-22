"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Search, Eye, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Chat {
  id: string
  clientName: string
  clientAvatar: string
  lawyerName: string
  lawyerAvatar: string
  date: string
  lastMessage: string
  tokensUsed: number
  status: "Active" | "Pending" | "Closed"
}

export function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Mock data for chats
  const chats: Chat[] = [
    {
      id: "1",
      clientName: "Hye-kyung",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      lawyerName: "Bit-na",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 10, 2024",
      lastMessage: '"Thanks a lot!"',
      tokensUsed: 6,
      status: "Active",
    },
    {
      id: "2",
      clientName: "Hye-kyung",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      lawyerName: "Bit-na",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 10, 2024",
      lastMessage: '"Thanks a lot!"',
      tokensUsed: 6,
      status: "Active",
    },
    {
      id: "3",
      clientName: "Hye-kyung",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      lawyerName: "Bit-na",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 10, 2024",
      lastMessage: '"Thanks a lot!"',
      tokensUsed: 6,
      status: "Active",
    },
    {
      id: "4",
      clientName: "Hye-kyung",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      lawyerName: "Bit-na",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 10, 2024",
      lastMessage: '"Thanks a lot!"',
      tokensUsed: 6,
      status: "Active",
    },
    {
      id: "5",
      clientName: "Hye-kyung",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      lawyerName: "Bit-na",
      lawyerAvatar: "/placeholder.svg?height=40&width=40",
      date: "Jan 10, 2024",
      lastMessage: '"Thanks a lot!"',
      tokensUsed: 6,
      status: "Active",
    },
  ]

  // Filter chats based on search query and status filter
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lawyerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? chat.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting chats:", filteredChats)
    alert("Export functionality would be implemented here")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full overflow-x-hidden flex-1">
              <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Chats</h1>
                <p className="text-sm text-gray-500">Chats list</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
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
                      <tr className="text-sm text-gray-500">
                        <th className="font-normal text-left py-3 px-4 border-b">Client Name</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Lawyer Name</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Date</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Last Message</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Tokens Used</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Status</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredChats.map((chat) => (
                        <tr key={chat.id} className="border-t hover:bg-gray-50">
                          <td className="py-4 px-4">{chat.clientName}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={chat.lawyerAvatar || "/placeholder.svg"}
                                  alt={chat.lawyerName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span>{chat.lawyerName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">{chat.date}</td>
                          <td className="py-4 px-4">{chat.lastMessage}</td>
                          <td className="py-4 px-4">{chat.tokensUsed}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                chat.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : chat.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {chat.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Info className="h-4 w-4" />
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
                {filteredChats.map((chat) => (
                  <div key={chat.id} className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{chat.clientName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-6 w-6 rounded-full overflow-hidden bg-gray-200">
                            <img
                              src={chat.lawyerAvatar || "/placeholder.svg"}
                              alt={chat.lawyerName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-500">{chat.lawyerName}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          chat.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : chat.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {chat.status}
                      </span>
                    </div>

                    <div className="text-sm space-y-2 mb-3">
                      <p className="text-gray-600">{chat.lastMessage}</p>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">{chat.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tokens Used:</span>
                        <span className="font-medium">{chat.tokensUsed}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8">
                        <Info className="h-4 w-4" />
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

"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyersTable } from "@/components/lawyers/lawyers-table"
import { LawyersHeader } from "@/components/lawyers/lawyers-header"
import { LawyersFilter } from "@/components/lawyers/lawyers-filter"
import type { Lawyer } from "@/types/lawyer"

// Sample data - in a real app, this would come from an API
const initialLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "2",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "pending",
    joined: "Jan 10, 2024",
  },
  {
    id: "3",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "4",
    name: "Bo-young",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "5",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "pending",
    joined: "Jan 10, 2024",
  },
  {
    id: "6",
    name: "Bo-young",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "7",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "pending",
    joined: "Jan 10, 2024",
  },
  {
    id: "8",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "9",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
  {
    id: "10",
    name: "Bit-na",
    avatar: "/placeholder.svg?height=40&width=40",
    specialization: "Family Law",
    requestedDate: "18/02/2025 6:AM",
    mode: "Video",
    status: "active",
    joined: "Jan 10, 2024",
  },
]

export function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>(initialLawyers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Filter lawyers based on search query and status filter
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? lawyer.status === statusFilter.toLowerCase() : true
    return matchesSearch && matchesStatus
  })

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full flex-1">
              <LawyersHeader />
              <LawyersFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                className="w-full mt-6"
              />
              <LawyersTable lawyers={filteredLawyers} />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

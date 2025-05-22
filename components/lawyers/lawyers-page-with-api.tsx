"use client"

import { useEffect, useState } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LawyersTable } from "@/components/lawyers/lawyers-table"
import { LawyersHeader } from "@/components/lawyers/lawyers-header"
import { LawyersFilter } from "@/components/lawyers/lawyers-filter"
import { AddLawyerForm } from "@/components/lawyers/add-lawyer-form"
import type { Lawyer } from "@/types/lawyer"
import { LawyerService } from "@/components/lawyers/lawyer-service"
import { Button } from "@/components/ui/button"

export function LawyersPageWithAPI() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch lawyers on component mount
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setIsLoading(true)
        const data = await LawyerService.getLawyers()
        setLawyers(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch lawyers. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLawyers()
  }, [])

  // Add a new lawyer
  const handleAddLawyer = async (lawyer: Lawyer) => {
    try {
      const newLawyer = await LawyerService.addLawyer(lawyer)
      setLawyers((prev) => [...prev, newLawyer])
    } catch (err) {
      setError("Failed to add lawyer. Please try again.")
      console.error(err)
    }
  }

  // Filter lawyers based on search query and status filter
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? lawyer.status === statusFilter.toLowerCase() : true
    return matchesSearch && matchesStatus
  })

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-8">
              <div className="flex justify-between items-center mb-6">
                <LawyersHeader />
                <AddLawyerForm onAddLawyer={handleAddLawyer} />
              </div>

              <LawyersFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              {isLoading ? (
                <div className="text-center py-8">Loading lawyers...</div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  {error}
                  <Button variant="outline" className="ml-4" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                </div>
              ) : (
                <LawyersTable lawyers={filteredLawyers} />
              )}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MyCasesHeader } from "@/components/my-cases/my-cases-header"
import { MyCasesFilter } from "@/components/my-cases/my-cases-filter"
import { MyCasesTable } from "@/components/my-cases/my-cases-table"
import { CaseService } from "@/services/case-service"
import type { Case, CaseStatus } from "@/types/case"

export function MyCasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [filteredCases, setFilteredCases] = useState<Case[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<CaseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch cases on component mount
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true)
        const data = await CaseService.getCases()
        setCases(data)
        setFilteredCases(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch cases. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCases()
  }, [])

  // Filter cases when search query or status filter changes
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filters = {
          search: searchQuery,
          status: statusFilter,
        }
        const filteredData = await CaseService.getCases(filters)
        setFilteredCases(filteredData)
      } catch (err) {
        console.error("Error applying filters:", err)
      }
    }

    applyFilters()
  }, [searchQuery, statusFilter])

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting cases:", filteredCases)
    alert("Export functionality would be implemented here")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white w-full">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto w-full">
            <main className="p-4 md:p-6 lg:p-8 w-full max-w-none flex-1">
              <MyCasesHeader />
              <MyCasesFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onExport={handleExport}
                className="w-full"
              />

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse text-gray-500">Loading cases...</div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">{error}</div>
              ) : (
                <MyCasesTable cases={filteredCases} />
              )}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

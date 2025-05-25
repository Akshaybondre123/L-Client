"use client"

import { useForm } from "react-hook-form"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { CaseStatus } from "@/types/case"

interface MyCasesFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: CaseStatus | null
  setStatusFilter: (status: CaseStatus | null) => void
  onExport: () => void
  className?: string
}

export function MyCasesFilter({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onExport,
  className,
}: MyCasesFilterProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: searchQuery,
    },
  })

  const onSubmit = (data: { search: string }) => {
    setSearchQuery(data.search)
  }

  return (
    <div className={`flex items-center justify-between gap-4 mb-6 w-full flex-wrap ${className || ""}`}>
      {/* Search Bar (Left) */}
      <div className="relative w-full sm:w-1/2 lg:w-1/3">
        <form onChange={handleSubmit(onSubmit)}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register("search")}
            type="text"
            placeholder="Search by name"
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </form>
      </div>

      {/* Filter Controls (Right side) */}
      <div className="flex gap-3 items-center justify-end w-full sm:w-auto mt-4 sm:mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-white border-gray-200 px-4 py-2 h-10">
              Status
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("in progress")}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("closed")}>Closed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="bg-white border-gray-200 px-4 py-2 h-10" onClick={onExport}>
          Export
        </Button>
      </div>
    </div>
  )
}

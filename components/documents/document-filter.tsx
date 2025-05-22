"use client"

import { useForm } from "react-hook-form"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { DocumentStatus } from "@/types/document"

interface DocumentFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: DocumentStatus | null
  setStatusFilter: (status: DocumentStatus | null) => void
  onExport: () => void
  onAddDocument: () => void
  className?: string
}

export function DocumentFilter({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onExport,
  onAddDocument,
  className,
}: DocumentFilterProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: searchQuery,
    },
  })

  const onSubmit = (data: { search: string }) => {
    setSearchQuery(data.search)
  }

  return (
    <div className={`flex flex-col sm:flex-row justify-between gap-4 mb-6 w-full ${className || ""}`}>
      <div className="relative w-full sm:w-80">
        <form onChange={handleSubmit(onSubmit)}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            {...register("search")}
            type="text"
            placeholder="Search by document"
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </form>
      </div>
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-white">
              Status
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Approved")}>Approved</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Rejected")}>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="bg-white" onClick={onExport}>
          Export
        </Button>
        <Button className="bg-black hover:bg-gray-800" onClick={onAddDocument}>
          Add Document
        </Button>
      </div>
    </div>
  )
}

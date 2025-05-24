"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TokenStatusBadge } from "@/components/tokens/token-status-badge"

interface TokenTransaction {
  id: string
  date: string
  type: "Purchase" | "Chat" | "Video Call" | "Document" | "Refund"
  description: string
  tokensChange: number
  balanceAfter: number
  status: "Success" | "Pending" | "Failed" | "Used" | "Refunded"
}

export function TokenHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  })

  // Mock data for token transactions
  const transactions: TokenTransaction[] = [
    {
      id: "1",
      date: "11/10/2024",
      type: "Purchase",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Success",
    },
    {
      id: "2",
      date: "11/10/2024",
      type: "Chat",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Used",
    },
    {
      id: "3",
      date: "11/10/2024",
      type: "Purchase",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Success",
    },
    {
      id: "4",
      date: "11/10/2024",
      type: "Video Call",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Success",
    },
    {
      id: "5",
      date: "11/10/2024",
      type: "Purchase",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Success",
    },
    {
      id: "6",
      date: "11/10/2024",
      type: "Purchase",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Success",
    },
    {
      id: "7",
      date: "11/10/2024",
      type: "Purchase",
      description: "Bought 100 tokens",
      tokensChange: 100,
      balanceAfter: 120,
      status: "Success",
    },
  ]

  // Filter transactions based on search query and status filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? transaction.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting transactions:", filteredTransactions)
    alert("Export functionality would be implemented here")
  }

  const onSubmit = (data: { search: string }) => {
    setSearchQuery(data.search)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-white">
        <ClientSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full overflow-x-hidden flex-1">
              <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Token History</h1>
                <p className="text-sm text-gray-500">Token History list</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                  <form onChange={handleSubmit(onSubmit)}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      {...register("search")}
                      type="text"
                      placeholder="Search by name"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                    />
                  </form>
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
                        <th className="font-normal text-left py-3 px-4 border-b">Date</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Type</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Description</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Tokens (+/-)</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Balance After</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction, index) => (
                        <tr
                          key={transaction.id}
                          className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                        >
                          <td className="py-4 px-4">{transaction.date}</td>
                          <td className="py-4 px-4">{transaction.type}</td>
                          <td className="py-4 px-4">{transaction.description}</td>
                          <td className="py-4 px-4 text-green-600">+{transaction.tokensChange}</td>
                          <td className="py-4 px-4">{transaction.balanceAfter}</td>
                          <td className="py-4 px-4">
                            <TokenStatusBadge status={transaction.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`rounded-lg shadow-sm border p-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{transaction.type}</h3>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <TokenStatusBadge status={transaction.status} />
                    </div>

                    <p className="text-sm mb-3">{transaction.description}</p>

                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Tokens:</span>
                        <span className="ml-1 text-green-600">+{transaction.tokensChange}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Balance:</span>
                        <span className="ml-1 font-medium">{transaction.balanceAfter}</span>
                      </div>
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

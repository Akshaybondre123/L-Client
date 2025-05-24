"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Search, Eye, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  title: string
  category: string
  datePosted: string
  lawyerReplies: number
  privacy: "Public" | "Private"
  status: "Answered" | "Pending" | "Closed"
}

export function QAPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      title: "Can a tenant be evicted without notice?",
      category: "Property Law",
      datePosted: "11/10/2024",
      lawyerReplies: 2,
      privacy: "Public",
      status: "Answered",
    },
    {
      id: "2",
      title: "What are my rights after arrest?",
      category: "Criminal Law",
      datePosted: "11/10/2024",
      lawyerReplies: 2,
      privacy: "Private",
      status: "Pending",
    },
    {
      id: "3",
      title: "Can a tenant be evicted without notice?",
      category: "Property Law",
      datePosted: "11/10/2024",
      lawyerReplies: 2,
      privacy: "Public",
      status: "Answered",
    },
    {
      id: "4",
      title: "Can a tenant be evicted without notice?",
      category: "Property Law",
      datePosted: "11/10/2024",
      lawyerReplies: 2,
      privacy: "Private",
      status: "Answered",
    },
  ])

  // Filter questions based on search query and status filter
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? question.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    console.log("Exporting questions:", filteredQuestions)
    alert("Export functionality would be implemented here")
  }

  const handleViewQuestion = (id: string) => {
    console.log("View question:", id)
  }

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  // Function to render status badge inline
  const renderStatusBadge = (status: string) => {
    let bgColor = "bg-yellow-100"
    let textColor = "text-yellow-700"

    if (status === "Answered") {
      bgColor = "bg-green-100"
      textColor = "text-green-700"
    } else if (status === "Closed") {
      bgColor = "bg-gray-100"
      textColor = "text-gray-700"
    }

    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>{status}</span>
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
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">My Questions</h1>
                <p className="text-sm text-gray-500">My Questions list</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search by title or category"
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="bg-white">
                    Status
                  </Button>
                  <Button variant="outline" className="bg-white" onClick={handleExport}>
                    Export
                  </Button>
                  <Button className="bg-black hover:bg-gray-800" onClick={() => router.push("/qa/add")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                </div>
              </div>

              {/* Desktop view */}
              <div className="bg-white rounded-lg shadow-sm border w-full flex-1 hidden md:block">
                <div className="overflow-x-auto w-full max-w-full">
                  <table className="w-full min-w-full">
                    <thead>
                      <tr className="text-sm text-gray-500 bg-gray-50">
                        <th className="font-normal text-left py-3 px-4 border-b">Title</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Category</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Date Posted</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Lawyer Replies</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Privacy</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Status</th>
                        <th className="font-normal text-left py-3 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuestions.map((question, index) => (
                        <tr
                          key={question.id}
                          className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                        >
                          <td className="py-4 px-4">{question.title}</td>
                          <td className="py-4 px-4">{question.category}</td>
                          <td className="py-4 px-4">{question.datePosted}</td>
                          <td className="py-4 px-4">{question.lawyerReplies}</td>
                          <td className="py-4 px-4">{question.privacy}</td>
                          <td className="py-4 px-4">{renderStatusBadge(question.status)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewQuestion(question.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeleteQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
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
                {filteredQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`rounded-lg shadow-sm border p-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{question.title}</h3>
                        <p className="text-xs text-gray-500">
                          {question.category} • {question.datePosted}
                        </p>
                      </div>
                      {renderStatusBadge(question.status)}
                    </div>

                    <div className="text-sm space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Lawyer Replies:</span>
                        <span className="font-medium">{question.lawyerReplies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Privacy:</span>
                        <span className="font-medium">{question.privacy}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8"
                        onClick={() => handleViewQuestion(question.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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

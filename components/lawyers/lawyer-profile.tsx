"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Lawyer } from "@/types/lawyer"

interface LawyerProfileProps {
  lawyerId: string
}

export function LawyerProfile({ lawyerId }: LawyerProfileProps) {
  const router = useRouter()
  const [lawyer, setLawyer] = useState<Lawyer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating API call with mock data
    const fetchLawyer = async () => {
      setLoading(true)
      try {
        // Mock data for demonstration
        const mockLawyer: Lawyer = {
          id: lawyerId,
          name: "Bit-na",
          avatar: "/placeholder.svg?height=120&width=120",
          specialization: "Family Law",
          requestedDate: "18/02/2025 6:AM",
          mode: "Video",
          status: "active",
          joined: "Jan 10, 2024",
          experience:
            "Experienced civil and criminal lawyer with 10+ years of practice in high court and district courts.",
          email: "xxxxxxxxxx@gmail.com",
          address: "102 304 Sujik-ro 3-gil 23, ongno-gu",
          phone: "XX 12345678900",
          totalClients: 36,
        }

        setLawyer(mockLawyer)
      } catch (error) {
        console.error("Error fetching lawyer:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLawyer()
  }, [lawyerId])

  const handleConsultationRequest = () => {
    // Handle consultation request logic
    console.log("Consultation requested with lawyer:", lawyerId)
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50">
          <ClientSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 overflow-auto">
              <main className="p-8">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse">Loading lawyer profile...</div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  if (!lawyer) {
    return (
      <SidebarProvider>
        <div className="flex h-screen bg-gray-50">
          <ClientSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <div className="flex-1 overflow-auto">
              <main className="p-8">
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  Lawyer not found
                  <Button variant="outline" className="ml-4" onClick={() => router.push("/lawyers")}>
                    Back to Lawyers
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Lawyers Profile</h1>
                <p className="text-sm text-gray-500">lawyers profile</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow">
                        <img
                          src={lawyer.avatar || "/placeholder.svg"}
                          alt={lawyer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                        Total Client: {lawyer.totalClients}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{lawyer.name}</h2>
                    <p className="text-gray-600 mb-4">{lawyer.experience}</p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span>{lawyer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <span>{lawyer.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <span>{lawyer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-start justify-end">
                    <Button onClick={handleConsultationRequest} className="bg-black hover:bg-gray-800 text-white">
                      Consultation Request
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional sections can be added here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-medium mb-4">Expertise</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>Family Law</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>Civil Law</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>Criminal Law</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-medium mb-4">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

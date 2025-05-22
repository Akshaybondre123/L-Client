import type { Lawyer } from "@/types/lawyer"

// This is a mock service that would be replaced with actual API calls
export const LawyerService = {
  // Get all lawyers
  getLawyers: async (): Promise<Lawyer[]> => {
    // In a real app, this would be an API call
    // return await fetch('/api/lawyers').then(res => res.json())

    // For now, return mock data
    return Promise.resolve([
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
      // More lawyers...
    ])
  },

  // Add a new lawyer
  addLawyer: async (lawyer: Omit<Lawyer, "id">): Promise<Lawyer> => {
    // In a real app, this would be an API call
    // return await fetch('/api/lawyers', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(lawyer)
    // }).then(res => res.json())

    // For now, return mock data with a generated ID
    return Promise.resolve({
      ...lawyer,
      id: Math.random().toString(36).substring(2, 9),
    } as Lawyer)
  },

  // Update a lawyer
  updateLawyer: async (id: string, lawyer: Partial<Lawyer>): Promise<Lawyer> => {
    // In a real app, this would be an API call
    // return await fetch(`/api/lawyers/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(lawyer)
    // }).then(res => res.json())

    // For now, return mock data
    return Promise.resolve({
      id,
      name: lawyer.name || "Unknown",
      avatar: lawyer.avatar || "/placeholder.svg?height=40&width=40",
      specialization: lawyer.specialization || "Unknown",
      requestedDate: lawyer.requestedDate || new Date().toISOString(),
      mode: lawyer.mode || "Video",
      status: lawyer.status || "active",
      joined: lawyer.joined || new Date().toLocaleDateString(),
    })
  },

  // Delete a lawyer
  deleteLawyer: async (id: string): Promise<void> => {
    // In a real app, this would be an API call
    // return await fetch(`/api/lawyers/${id}`, {
    //   method: 'DELETE'
    // }).then(() => {})

    // For now, just return a resolved promise
    return Promise.resolve()
  },
}

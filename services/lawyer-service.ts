import type { Lawyer } from "@/types/lawyer"

// This is a mock service that would be replaced with actual API calls in a real application
export class LawyerService {
  // Get all lawyers
  static async getLawyers(): Promise<Lawyer[]> {
    // In a real app, this would be an API call
    // return await fetch('/api/lawyers').then(res => res.json())

    // Mock data for demonstration
    return [
      {
        id: "1",
        name: "Bit-na",
        avatar: "/placeholder.svg?height=40&width=40",
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
      // Add more mock data as needed
    ]
  }

  // Get a lawyer by ID
  static async getLawyerById(id: string): Promise<Lawyer | null> {
    // In a real app, this would be an API call
    // return await fetch(`/api/lawyers/${id}`).then(res => res.json())

    // Mock data for demonstration
    const lawyers = await this.getLawyers()
    const lawyer = lawyers.find((l) => l.id === id)

    if (!lawyer) {
      return null
    }

    // Add additional profile data if not present
    return {
      ...lawyer,
      experience:
        lawyer.experience ||
        "Experienced civil and criminal lawyer with 10+ years of practice in high court and district courts.",
      email: lawyer.email || "xxxxxxxxxx@gmail.com",
      address: lawyer.address || "102 304 Sujik-ro 3-gil 23, ongno-gu",
      phone: lawyer.phone || "XX 12345678900",
      totalClients: lawyer.totalClients || 36,
    }
  }

  // Request a consultation with a lawyer
  static async requestConsultation(lawyerId: string, data: any): Promise<{ success: boolean; message: string }> {
    // In a real app, this would be an API call
    // return await fetch(`/api/lawyers/${lawyerId}/consultations`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(res => res.json())

    // Mock response for demonstration
    return {
      success: true,
      message: "Consultation request sent successfully",
    }
  }
}

export interface Lawyer {
  id: string
  name: string
  avatar: string
  specialization: string
  requestedDate: string
  mode: string
  status: string
  joined: string
  // Additional fields for lawyer profile
  experience?: string
  email?: string
  address?: string
  phone?: string
  totalClients?: number
}

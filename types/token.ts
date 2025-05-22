export interface TokenTransaction {
  id: string
  date: string
  type: "Purchase" | "Chat" | "Video Call" | "Document" | "Refund"
  description: string
  tokensChange: number
  balanceAfter: number
  status: "Success" | "Pending" | "Failed" | "Used" | "Refunded"
}

export interface TokenBalance {
  available: number
  pending: number
  total: number
}

export interface TokenPurchase {
  id: string
  amount: number
  price: number
  currency: string
  paymentMethod: string
  status: "Success" | "Pending" | "Failed"
  createdAt: string
}

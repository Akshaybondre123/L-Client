import type { TokenTransaction, TokenBalance, TokenPurchase } from "@/types/token"

// This is a mock service that would be replaced with actual API calls in a real application
export class TokenService {
  // Get token transaction history
  static async getTransactionHistory(): Promise<TokenTransaction[]> {
    // In a real app, this would be an API call
    // return await fetch('/api/tokens/transactions').then(res => res.json())

    // Mock data for demonstration
    return [
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
        description: "Used for chat with lawyer",
        tokensChange: -20,
        balanceAfter: 100,
        status: "Used",
      },
      // Add more mock data as needed
    ]
  }

  // Get token balance
  static async getTokenBalance(): Promise<TokenBalance> {
    // In a real app, this would be an API call
    // return await fetch('/api/tokens/balance').then(res => res.json())

    // Mock data for demonstration
    return {
      available: 100,
      pending: 0,
      total: 100,
    }
  }

  // Purchase tokens
  static async purchaseTokens(amount: number): Promise<TokenPurchase> {
    // In a real app, this would be an API call
    // return await fetch('/api/tokens/purchase', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount })
    // }).then(res => res.json())

    // Mock data for demonstration
    return {
      id: Math.random().toString(),
      amount,
      price: amount * 0.1, // Assuming $0.10 per token
      currency: "USD",
      paymentMethod: "Credit Card",
      status: "Success",
      createdAt: new Date().toISOString(),
    }
  }
}

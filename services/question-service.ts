import type { Question, QuestionReply, QuestionCategory } from "@/types/question"

// This is a mock service that would be replaced with actual API calls in a real application
export class QuestionService {
  // Get all questions for the current user
  static async getUserQuestions(): Promise<Question[]> {
    // In a real app, this would be an API call
    // return await fetch('/api/questions').then(res => res.json())

    // Mock data for demonstration
    return [
      {
        id: "1",
        title: "Can a tenant be evicted without notice?",
        category: "Property Law",
        description:
          "I'm renting an apartment and my landlord is threatening to evict me without any prior notice. Is this legal?",
        datePosted: "11/10/2024",
        lawyerReplies: 2,
        privacy: "Public",
        status: "Answered",
        userId: "user1",
      },
      {
        id: "2",
        title: "What are my rights after arrest?",
        category: "Criminal Law",
        description: "I was recently arrested and I'm not sure what my rights are. Can you explain what I should know?",
        datePosted: "11/10/2024",
        lawyerReplies: 2,
        privacy: "Private",
        status: "Pending",
        userId: "user1",
      },
      // Add more mock data as needed
    ]
  }

  // Get a question by ID
  static async getQuestionById(id: string): Promise<Question | null> {
    // In a real app, this would be an API call
    // return await fetch(`/api/questions/${id}`).then(res => res.json())

    const questions = await this.getUserQuestions()
    return questions.find((q) => q.id === id) || null
  }

  // Get replies for a question
  static async getQuestionReplies(questionId: string): Promise<QuestionReply[]> {
    // In a real app, this would be an API call
    // return await fetch(`/api/questions/${questionId}/replies`).then(res => res.json())

    // Mock data for demonstration
    return [
      {
        id: "1",
        questionId,
        content:
          "According to tenancy laws, a landlord must provide proper notice before eviction. The notice period depends on your jurisdiction and the terms of your lease agreement.",
        createdAt: "11/10/2024",
        lawyerId: "lawyer1",
        lawyerName: "John Doe",
        lawyerAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        questionId,
        content:
          "I agree with the previous answer. Additionally, you should check your lease agreement for specific terms regarding termination and eviction procedures.",
        createdAt: "11/11/2024",
        lawyerId: "lawyer2",
        lawyerName: "Jane Smith",
        lawyerAvatar: "/placeholder.svg?height=40&width=40",
      },
    ]
  }

  // Add a new question
  static async addQuestion(
    question: Omit<Question, "id" | "datePosted" | "lawyerReplies" | "status">,
  ): Promise<Question> {
    // In a real app, this would be an API call
    // return await fetch('/api/questions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(question)
    // }).then(res => res.json())

    // Mock data for demonstration
    return {
      ...question,
      id: Math.random().toString(),
      datePosted: new Date().toLocaleDateString(),
      lawyerReplies: 0,
      status: "Pending",
    }
  }

  // Get question categories
  static async getQuestionCategories(): Promise<QuestionCategory[]> {
    // In a real app, this would be an API call
    // return await fetch('/api/questions/categories').then(res => res.json())

    // Mock data for demonstration
    return [
      {
        id: "1",
        name: "Property Law",
        description: "Questions related to real estate, landlord-tenant issues, and property rights.",
        iconName: "home",
      },
      {
        id: "2",
        name: "Criminal Law",
        description: "Questions related to criminal offenses, arrests, and legal proceedings.",
        iconName: "shield",
      },
      {
        id: "3",
        name: "Family Law",
        description: "Questions related to divorce, child custody, and family matters.",
        iconName: "users",
      },
      {
        id: "4",
        name: "Employment Law",
        description: "Questions related to workplace issues, contracts, and employment rights.",
        iconName: "briefcase",
      },
      {
        id: "5",
        name: "Immigration Law",
        description: "Questions related to visas, citizenship, and immigration procedures.",
        iconName: "globe",
      },
    ]
  }
}

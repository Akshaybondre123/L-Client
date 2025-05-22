export interface Question {
  id: string
  title: string
  category: string
  description: string
  datePosted: string
  lawyerReplies: number
  privacy: "Public" | "Private"
  status: "Answered" | "Pending" | "Closed"
  userId: string
}

export interface QuestionReply {
  id: string
  questionId: string
  content: string
  createdAt: string
  lawyerId: string
  lawyerName: string
  lawyerAvatar: string
}

export interface QuestionCategory {
  id: string
  name: string
  description: string
  iconName: string
}

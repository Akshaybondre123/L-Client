"use client"

import { AddQuestionPage } from "@/components/qa/add-question-page"
import { useRouter } from "next/navigation"

export default function AddQuestionRoute() {
  const router = useRouter()

  const handleAddQuestion = () => {
    router.push("/qa")
  }

  const handleCancel = () => {
    router.push("/qa")
  }

  return <AddQuestionPage onAddQuestion={handleAddQuestion} onCancel={handleCancel} />
}

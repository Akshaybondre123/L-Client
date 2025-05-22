"use client"

import { use } from "react"
import { LawyerProfile } from "@/components/lawyers/lawyer-profile"

export default function LawyerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return <LawyerProfile lawyerId={id} />
}

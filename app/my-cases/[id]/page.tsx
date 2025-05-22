"use client"

import { CaseDetail } from "@/components/my-cases/case-detail"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return <CaseDetail caseId={params.id} />
}

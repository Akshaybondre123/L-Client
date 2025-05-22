import { cn } from "@/lib/utils"

interface DocumentStatusBadgeProps {
  status: string
  className?: string
}

export function DocumentStatusBadge({ status, className }: DocumentStatusBadgeProps) {
  const statusMap: Record<string, { color: string; bg: string }> = {
    approved: {
      color: "text-green-700",
      bg: "bg-green-100",
    },
    pending: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    rejected: {
      color: "text-red-700",
      bg: "bg-red-100",
    },
  }

  const statusKey = status.toLowerCase()
  const statusStyle = statusMap[statusKey] || statusMap.pending

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusStyle.color, statusStyle.bg, className)}>
      {status}
    </span>
  )
}

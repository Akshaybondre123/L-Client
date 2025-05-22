import { cn } from "@/lib/utils"

interface TokenStatusBadgeProps {
  status: string
  className?: string
}

export function TokenStatusBadge({ status, className }: TokenStatusBadgeProps) {
  const statusMap: Record<string, { color: string; bg: string }> = {
    success: {
      color: "text-green-700",
      bg: "bg-green-100",
    },
    pending: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    failed: {
      color: "text-red-700",
      bg: "bg-red-100",
    },
    used: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    refunded: {
      color: "text-blue-700",
      bg: "bg-blue-100",
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

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusMap: Record<string, { color: string; bg: string }> = {
    active: {
      color: "text-green-700",
      bg: "bg-green-100",
    },
    "in progress": {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    pending: {
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    closed: {
      color: "text-gray-700",
      bg: "bg-gray-100",
    },
  }

  const statusKey = status.toLowerCase()
  const statusStyle = statusMap[statusKey] || statusMap.closed

  const displayStatus = statusKey === "in progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusStyle.color, statusStyle.bg, className)}>
      {displayStatus}
    </span>
  )
}

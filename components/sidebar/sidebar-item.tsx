import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: ReactNode
  label: string
  active?: boolean
}

export function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <div className={cn("flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100", active && "bg-gray-100")}>
      <div className="text-gray-500">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  )
}

import type React from "react"
import { Users, Home, Briefcase, CreditCard } from "lucide-react"

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <MetricCard title="Total Cases" value="12" icon={<Users className="h-5 w-5 text-gray-600" />} />
      <MetricCard title="Active Cases" value="2" icon={<Home className="h-5 w-5 text-gray-600" />} />
      <MetricCard title="Lawyer name" value="Jk Agar..." icon={<Briefcase className="h-5 w-5 text-gray-600" />} />
      <MetricCard title="Token Balance" value="$1,200" icon={<CreditCard className="h-5 w-5 text-gray-600" />} />
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 relative" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <div>{icon}</div>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <div className="h-1 absolute bottom-0 left-0 right-0 rounded-b-lg" style={{ backgroundColor: "#775DA6" }}></div>
    </div>
  )
}

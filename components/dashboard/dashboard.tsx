"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { CaseStatus } from "@/components/dashboard/case-status"
import { ConsultationHistory } from "@/components/dashboard/consultation-history"
import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full flex-1">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-8 mt-2">Dashboard</h1>
              <DashboardMetrics />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-8">
                <div className="lg:col-span-1">
                  <CaseStatus />
                </div>
                <div className="lg:col-span-2">
                  <ConsultationHistory />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

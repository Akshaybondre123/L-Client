"use client"

import { ClientSidebar } from "@/components/sidebar/client-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"

export function AppGuidePage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-50">
        <ClientSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            <main className="p-4 md:p-8 w-full flex-1">
              <div className="mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 md:h-6 md:w-6" /> Install Our Legal Client App
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Get instant access to your cases, chat with lawyers, manage documents, and more — directly from your
                  home screen
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 w-full flex-1">
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-lg font-medium mb-3 md:mb-4">Android (Chrome)</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li className="text-sm md:text-base">
                        Open the website in <span className="font-medium">Chrome</span> browser.
                      </li>
                      <li className="text-sm md:text-base">
                        Tap the <span className="font-medium">three dots</span> (menu) in the top-right corner.
                      </li>
                      <li className="text-sm md:text-base">
                        Tap "<span className="font-medium">Add to Home screen</span>".
                      </li>
                      <li className="text-sm md:text-base">
                        Tap <span className="font-medium">Install</span> to confirm.
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-3 md:mb-4">iPhone (Safari)</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li className="text-sm md:text-base">
                        Open the website in <span className="font-medium">Safari</span> browser.
                      </li>
                      <li className="text-sm md:text-base">
                        Tap the <span className="font-medium">Share icon</span> (square with arrow).
                      </li>
                      <li className="text-sm md:text-base">
                        Scroll and tap "<span className="font-medium">Add to Home Screen</span>".
                      </li>
                      <li className="text-sm md:text-base">
                        Tap <span className="font-medium">Add</span> in the top-right corner.
                      </li>
                    </ol>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-black hover:bg-gray-800 w-full sm:w-auto">Install Now</Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

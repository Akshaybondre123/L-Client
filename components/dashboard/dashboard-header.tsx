"use client"

import { useState, useRef, useEffect } from "react"
import { Settings, MessageSquare, Bell, ChevronDown, User, Lock, LogOut, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useIsMobile } from "@/hooks/use-mobile"

export function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      {/* Search bar - hidden on mobile to match the design */}
      <div className={`relative ${isMobile ? "hidden" : "block w-full max-w-md"}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:bg-white"
        />
      </div>

      {/* Empty div for mobile to maintain flex layout */}
      <div className={isMobile ? "flex-1" : "hidden"}></div>

      {/* Header icons and profile section */}
      <div className="flex items-center gap-5">
        <button className="text-gray-500 hover:text-gray-700">
          <Settings size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <MessageSquare size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
            1
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="flex flex-col items-end">
              <span className="font-medium text-sm">Anima Agr</span>
              <span className="text-xs text-gray-500">korea XXX</span>
            </div>
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Anima Agr" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="h-4 w-4" />
                <span>Manage Account</span>
              </button>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Lock className="h-4 w-4" />
                <span>Change Password</span>
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

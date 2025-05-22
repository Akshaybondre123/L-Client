"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  LayoutGrid,
  Users,
  Briefcase,
  FileText,
  MessageCircle,
  Video,
  Ticket,
  HelpCircle,
  BookOpen,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function ClientSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  // Handle clicks outside the sidebar to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("client-sidebar")
      if (isMobile && isOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, isOpen])

  // Add body class to prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen, isMobile])

  const toggleSidebar = () => {
    console.log("Toggle sidebar clicked, current state:", isOpen)
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      {/* Hamburger menu button for mobile */}
      {isMobile && (
        <button
          type="button"
          className="fixed top-4 left-4 z-[100] p-2 rounded-md bg-white shadow-md md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {!isOpen && <Menu className="h-6 w-6 text-gray-900" />}
        </button>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          id="client-sidebar"
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="py-8 px-6 border-b relative">
              <button
                type="button"
                className="absolute top-8 right-6 p-1 rounded-md"
                onClick={toggleSidebar}
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-900" />
              </button>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                </div>
                <span className="font-semibold text-lg text-gray-900">Client Panel</span>
              </div>
            </div>

            <nav className="py-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <LayoutGrid className="h-5 w-5" />
                    <span className="text-base">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/lawyers" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <Users className="h-5 w-5" />
                    <span className="text-base">Lawyers</span>
                  </Link>
                </li>
                <li>
                  <Link href="/my-cases" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <Briefcase className="h-5 w-5" />
                    <span className="text-base">My Cases</span>
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <FileText className="h-5 w-5" />
                    <span className="text-base">Documents</span>
                  </Link>
                </li>
                <li>
                  <Link href="/chats" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-base">Chats</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/video-consultations"
                    className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100"
                  >
                    <Video className="h-5 w-5" />
                    <span className="text-base">Video Consultations</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tokens" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <Ticket className="h-5 w-5" />
                    <span className="text-base">Tokens</span>
                  </Link>
                </li>
                <li>
                  <Link href="/qa" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <HelpCircle className="h-5 w-5" />
                    <span className="text-base">Q&A</span>
                  </Link>
                </li>
                <li>
                  <Link href="/app-guide" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-base">App Guide</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100">
                    <Settings className="h-5 w-5" />
                    <span className="text-base">Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar className="border-r border-gray-200 h-screen min-w-[256px] w-64 flex-shrink-0 bg-white">
          <SidebarHeader className="py-8">
            <div className="flex items-center gap-3 px-6">
              <div className="h-9 w-9 rounded-full bg-gray-900 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
              </div>
              <span className="font-semibold text-lg text-gray-900">Client Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="space-y-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/"} tooltip="Dashboard" className="py-4 px-8">
                    <LayoutGrid className="h-5 w-5" />
                    <span className="ml-3 text-base">Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/lawyers" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === "/lawyers" || pathname.startsWith("/lawyers/")}
                    tooltip="Lawyers"
                    className="py-4 px-8"
                  >
                    <Users className="h-5 w-5" />
                    <span className="ml-3 text-base">Lawyers</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/my-cases" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/my-cases"} tooltip="My Cases" className="py-4 px-8">
                    <Briefcase className="h-5 w-5" />
                    <span className="ml-3 text-base">My Cases</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/documents" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/documents"} tooltip="Documents" className="py-4 px-8">
                    <FileText className="h-5 w-5" />
                    <span className="ml-3 text-base">Documents</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/chats" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/chats"} tooltip="Chats" className="py-4 px-8">
                    <MessageCircle className="h-5 w-5" />
                    <span className="ml-3 text-base">Chats</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/video-consultations" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={pathname === "/video-consultations"}
                    tooltip="Video Consultations"
                    className="py-4 px-8"
                  >
                    <Video className="h-5 w-5" />
                    <span className="ml-3 text-base">Video Consultations</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/tokens" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/tokens"} tooltip="Tokens" className="py-4 px-8">
                    <Ticket className="h-5 w-5" />
                    <span className="ml-3 text-base">Tokens</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/qa" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/qa"} tooltip="Q&A" className="py-4 px-8">
                    <HelpCircle className="h-5 w-5" />
                    <span className="ml-3 text-base">Q&A</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/app-guide" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/app-guide"} tooltip="App Guide" className="py-4 px-8">
                    <BookOpen className="h-5 w-5" />
                    <span className="ml-3 text-base">App Guide</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/settings" passHref legacyBehavior>
                  <SidebarMenuButton isActive={pathname === "/settings"} tooltip="Settings" className="py-4 px-8">
                    <Settings className="h-5 w-5" />
                    <span className="ml-3 text-base">Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}

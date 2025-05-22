import {
  Home,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Video,
  Ticket,
  HelpCircle,
  BookOpen,
  Settings,
} from "lucide-react"
import { SidebarItem } from "./sidebar-item"

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-black flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <span className="font-semibold">Client Panel</span>
      </div>
      <div className="flex-1 py-4">
        <SidebarItem icon={<Home size={18} />} label="Dashboard" active />
        <SidebarItem icon={<Users size={18} />} label="Lawyers" />
        <SidebarItem icon={<Briefcase size={18} />} label="My Cases" />
        <SidebarItem icon={<FileText size={18} />} label="Documents" />
        <SidebarItem icon={<MessageSquare size={18} />} label="Chats" />
        <SidebarItem icon={<Video size={18} />} label="Video Consultations" />
        <SidebarItem icon={<Ticket size={18} />} label="Tokens" />
        <SidebarItem icon={<HelpCircle size={18} />} label="Q&A" />
        <SidebarItem icon={<BookOpen size={18} />} label="App Guide" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </div>
    </div>
  )
}

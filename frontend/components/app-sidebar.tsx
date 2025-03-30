"use client"

import * as React from "react"
import {
  Bot,
  BrainCircuit,
  Code2,
  FileText,
  History,
  ImagePlus,
  MessageSquarePlus,
  Music4,
  Settings,
  Video,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BrainCircuit,
  },
  {
    title: "Conversación",
    url: "/generador-texto",
    icon: MessageSquarePlus,
  },
  {
    title: "Generador de Imágenes",
    url: "/generador-imagenes",
    icon: ImagePlus,
  },
  {
    title: "Generador de Código",
    url: "/generador-codigo",
    icon: Code2,
  },
  {
    title: "Generador de Audio",
    url: "/generador-audio",
    icon: Music4,
    disabled: true,
  },
  {
    title: "Generador de Video",
    url: "/generador-video",
    icon: Video,
    disabled: true,
  },
]

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r-0 bg-gradient-to-b from-black/50 to-purple-950/30 backdrop-blur-xl group/sidebar",
        className
      )}
      {...props}
    >
      <SidebarHeader className="border-b-0 bg-transparent">
        <div className="flex h-[60px] items-center justify-center">
          <Bot className="h-6 w-6 text-pink-500 shrink-0" />
          <span className="ml-2 font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent transition-all group-data-[state=collapsed]/sidebar:w-0 group-data-[state=collapsed]/sidebar:ml-0 group-data-[state=collapsed]/sidebar:opacity-0 overflow-hidden">
            AI Hub
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <NavMain
          items={navItems.map(item => ({
            ...item,
            isActive: pathname === item.url
          }))}
          itemClassName="hover:bg-white/5 data-[active=true]:bg-white/10"
          iconClassName="text-pink-500/80"
        />
      </SidebarContent>
      <SidebarFooter className="border-t-0 bg-transparent p-2">
        <NavMain
          items={[
            {
              title: "Configuración",
              url: "/settings",
              icon: Settings,
              isActive: pathname === "/settings"
            },
          ]}
          itemClassName="hover:bg-white/5"
          iconClassName="text-pink-500/80"
        />
      </SidebarFooter>
    </Sidebar>
  )
}

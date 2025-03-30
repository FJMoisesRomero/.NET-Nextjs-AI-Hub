"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserButton, useAuth } from "@clerk/nextjs"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Bot, ImageIcon, Video, MessageSquare, History, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { isLoaded, isSignedIn, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const stats = [
    {
      title: "Textos Generados",
      value: "28",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20"
    },
    {
      title: "Imágenes Creadas",
      value: "14",
      icon: ImageIcon,
      gradient: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/20"
    },
    {
      title: "Videos Producidos",
      value: "5",
      icon: Video,
      gradient: "from-red-500 to-pink-500",
      shadow: "shadow-red-500/20"
    }
  ]

  const recentActivity = [
    {
      type: "text",
      content: "Descripción del nuevo producto tecnológico",
      timestamp: "Hace 2 horas",
      icon: MessageSquare,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      type: "image",
      content: "Diseño futurista de interfaz de usuario",
      timestamp: "Hace 3 horas",
      icon: ImageIcon,
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      type: "video",
      content: "Video promocional del producto",
      timestamp: "Hace 5 horas",
      icon: Video,
      gradient: "from-red-500 to-pink-500"
    }
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#0f0f17]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f17] via-[#12121e] to-[#0f0f17] -z-10" />
        
        <header className="flex h-16 shrink-0 items-center justify-between px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-white/80 hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/90">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "bg-muted/95 backdrop-blur border-muted",
                  userButtonPopoverActions: "bg-muted/95",
                  userButtonPopoverActionButton: "hover:bg-muted-foreground/10",
                  userButtonPopoverActionButtonText: "text-foreground",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Welcome Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50" />
            <div className="relative">
              <h2 className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Bienvenido al Hub de IA
              </h2>
              <p className="text-white/70 max-w-lg">
                Explora el poder de la inteligencia artificial para crear contenido único. 
                Genera textos, imágenes y videos con un solo clic.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-xl border border-white/5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg ${stat.shadow}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{stat.title}</h3>
                <p className={`text-3xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-xl border border-white/5"
          >
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-white/70" />
              <h2 className="text-xl font-semibold text-white">Actividad Reciente</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${activity.gradient} flex items-center justify-center shadow-lg ${activity.type === 'text' ? 'shadow-purple-500/20' : activity.type === 'image' ? 'shadow-blue-500/20' : 'shadow-red-500/20'}`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/90">{activity.content}</p>
                    <p className="text-xs text-white/50">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

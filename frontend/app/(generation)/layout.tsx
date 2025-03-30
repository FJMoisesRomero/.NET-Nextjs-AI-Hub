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
import { redirect, usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const pageNames: Record<string, string> = {
  "/generador-texto": "Conversación",
  "/generador-imagenes": "Generador de Imágenes",
  "/generador-codigo": "Generador de Código",
  "/generador-audio": "Generador de Audio",
  "/generador-video": "Generador de Video",
}

export default function GenerationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const pageName = pageNames[pathname] || "AI Hub"

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login")
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-0 bg-[#0f0f17]">
          <header className="h-[60px] border-b border-white/5 flex items-center justify-between px-6 bg-[#0f0f17]/80 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-white/80 hover:text-white" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white/90">
                      {pageName}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              <UserButton 
                afterSignOutUrl="/login"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          </header>
          <main className="flex-1 relative min-h-0">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

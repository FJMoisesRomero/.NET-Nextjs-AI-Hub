"use client"

import { SignIn } from "@clerk/nextjs"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black/30 flex flex-col items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center gap-8">
        {/* Form */}
        <motion.div 
          className="relative w-full max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glow Effects */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/40 to-cyan-500/40 rounded-2xl blur-2xl opacity-50" />
          <div className="absolute inset-0 bg-black/20 rounded-xl backdrop-blur-sm" />
          
          {/* Clerk SignIn component */}
          <div className="relative p-4">
            <SignIn 
              afterSignInUrl="/dashboard"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-sm normal-case",
                  card: "bg-transparent shadow-none",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/80",
                  socialButtonsBlockButton: "bg-white/10 border-white/20 hover:bg-white/20 transition-all",
                  socialButtonsBlockButtonText: "text-white",
                  formFieldLabel: "text-white/80",
                  formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-white/40",
                  footerActionLink: "text-pink-400 hover:text-pink-300",
                  dividerLine: "bg-white/20",
                  dividerText: "text-white/60",
                  identityPreviewText: "text-white",
                  identityPreviewEditButtonIcon: "text-white"
                },
              }}
            />
          </div>
        </motion.div>

        {/* Decorative Image */}
        <motion.div 
          className="relative hidden lg:block w-[500px] h-[600px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="https://pngimg.com/uploads/ai/ai_PNG4.png"
            alt="AI Assistant"
            fill
            className="object-contain opacity-80 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

export const dynamic = 'force-static';

"use client"

import { useState } from "react"
import { Bot, Video, Loader2, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface VideoGeneration {
  prompt: string
  videoUrl: string
}

// Free video samples for demo purposes
const FREE_VIDEO_SAMPLES = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
]

export default function VideoGeneratorPage() {
  const [generations, setGenerations] = useState<VideoGeneration[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      setIsLoading(true)
      // Instead of making an API call, we'll return a random video sample
      const randomVideo = FREE_VIDEO_SAMPLES[Math.floor(Math.random() * FREE_VIDEO_SAMPLES.length)]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setGenerations(prev => [...prev, {
        prompt: input,
        videoUrl: randomVideo
      }])
      setInput("")
    } catch (error) {
      console.error("Error generando video:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f17] via-[#12121e] to-[#0f0f17] -z-10" />
      
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-500 text-sm">
                ⚠️ Esta es una versión de demostración que utiliza videos gratuitos. La generación de video con IA estará disponible próximamente.
              </p>
            </div>

            {generations.length === 0 && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Generador de Video con IA
                </h3>
                <p className="text-sm text-white/70 max-w-sm">
                  Escribe un mensaje para obtener un video de demostración
                </p>
              </motion.div>
            )}

            <AnimatePresence mode="popLayout">
              {generations.map((gen, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <div className="flex gap-4 px-4 py-6 -mx-4 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="text-sm font-medium bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Video de Demostración
                      </div>
                      <p className="text-sm text-white/70">{gen.prompt}</p>
                      <div className="relative rounded-lg bg-black/50 p-4">
                        <video 
                          controls 
                          className="w-full rounded-lg" 
                          key={gen.videoUrl}
                        >
                          <source src={gen.videoUrl} type="video/mp4" />
                          Tu navegador no soporta el elemento de video.
                        </video>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 px-4 py-6 -mx-4 bg-white/5 rounded-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Generando Video
                  </div>
                  <div className="flex gap-1.5">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-purple-500/40"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-purple-500/40"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-purple-500/40"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="relative border-t border-white/5">
        <div className="absolute inset-0 bg-[#0f0f17]/80 backdrop-blur-xl -z-10" />
        <div className="max-w-3xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="relative flex items-end">
            <Textarea
              placeholder="Describe el video que necesitas..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="min-h-[56px] max-h-48 pe-14 bg-white/5 hover:bg-white/[0.07] focus:bg-white/[0.07] backdrop-blur-xl resize-none border-0 shadow-none text-white placeholder:text-white/40 rounded-xl w-full"
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className={cn(
                "absolute right-3 bottom-3 h-8 w-8 rounded-lg bg-gradient-to-br shadow-lg transition-all duration-200",
                !input.trim() || isLoading
                  ? "from-[#0f0f17] to-[#0f0f17] shadow-none opacity-50"
                  : "from-purple-500 to-pink-500 shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105"
              )}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <Send className="h-4 w-4 text-white" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

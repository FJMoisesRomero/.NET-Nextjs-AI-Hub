"use client"

import { useState } from "react"
import { Bot, Code2, Loader2, Send, Copy, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface CodeGeneration {
  prompt: string
  code: string
  language: string
}

export default function CodeGeneratorPage() {
  const [generations, setGenerations] = useState<CodeGeneration[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:5015/api/generation/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (!response.ok) {
        throw new Error("Error al generar código")
      }

      const data = await response.json()
      setGenerations(prev => [...prev, {
        prompt: input,
        code: data.code,
        language: "javascript"
      }])
      setInput("")
    } catch (error) {
      console.error("Error generando código:", error)
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
            {generations.length === 0 && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Generador de Código con IA
                </h3>
                <p className="text-sm text-white/70 max-w-sm">
                  Describe el código que necesitas y nuestro asistente de IA lo generará para ti
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
                      <Code2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="text-sm font-medium bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Código Generado
                      </div>
                      <p className="text-sm text-white/70">{gen.prompt}</p>
                      <div className="relative">
                        <pre className="rounded-lg bg-black/50 p-4 overflow-x-auto whitespace-pre text-sm">
                          <code className="text-white/90 font-mono block min-w-full">
                            {gen.code}
                          </code>
                        </pre>
                        <div className="absolute top-2 right-2 flex gap-2 bg-black/30 p-1 rounded-lg backdrop-blur-sm">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-white/10"
                            onClick={() => navigator.clipboard.writeText(gen.code)}
                            title="Copiar código"
                          >
                            <Copy className="h-4 w-4 text-white/90" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-white/10"
                            onClick={async () => {
                              try {
                                const response = await fetch("http://localhost:5015/api/utils/open-in-notepad", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({ content: gen.code }),
                                });
                                
                                if (!response.ok) {
                                  throw new Error("Failed to open in Notepad");
                                }
                              } catch (error) {
                                console.error("Error opening in Notepad:", error);
                              }
                            }}
                            title="Abrir en Notepad"
                          >
                            <FileText className="h-4 w-4 text-white/90" />
                          </Button>
                        </div>
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
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    Generando Código
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
              placeholder="Describe el código que necesitas..."
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

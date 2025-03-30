"use client"

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Brain, Code, Video, Music, FileText, ChevronRight, ImageIcon, Sparkles, Play } from "lucide-react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { TypewriterEffect } from "@/components/TypeWritterEffect"
import Image from "next/image"
import { useEffect, useState } from "react"

function Star() {
  const [style, setStyle] = useState({ 
    width: '2px',
    height: '2px',
    left: '50%',
    top: '50%',
    opacity: 0,
    transform: 'scale(0)'
  })

  useEffect(() => {
    const randomSize = Math.random() * 2 + 1
    const left = Math.random() * 100
    const top = Math.random() * 100
    
    setStyle({
      width: `${randomSize}px`,
      height: `${randomSize}px`,
      left: `${left}%`,
      top: `${top}%`,
      opacity: 0,
      transform: 'scale(0)'
    })
  }, [])

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        filter: [
          "drop-shadow(0 0 0px rgba(255,255,255,0))",
          "drop-shadow(0 0 3px rgba(255,255,255,0.8))",
          "drop-shadow(0 0 0px rgba(255,255,255,0))",
        ],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 5,
        ease: "easeInOut",
      }}
    />
  )
}

function ShootingStar() {
  const [style, setStyle] = useState({
    width: '10px',
    height: '3px',
    left: '50%',
    top: '20%',
    opacity: 0,
    transform: 'scale(0) rotate(45deg)'
  })
  const [rotation, setRotation] = useState(45)

  useEffect(() => {
    const width = Math.random() * 5 + 6 // 6-11px
    const height = width / 3
    const left = Math.random() * 100
    const top = Math.random() * 20 + 10 // 10-30%
    const newRotation = Math.random() * 30 + 20 // 20-50deg
    
    setRotation(newRotation)
    setStyle({
      width: `${width}px`,
      height: `${height}px`,
      left: `${left}%`,
      top: `${top}%`,
      opacity: 0,
      transform: `scale(0) rotate(${newRotation}deg)`
    })
  }, [])

  const controls = useAnimation()
  const duration = Math.random() * 1.5 + 0.8 // Duración entre 0.8 y 2.3 segundos
  const delay = Math.random() * 8 // Delay entre 0 y 8 segundos

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          opacity: [0, 1, 0],
          x: [0, Math.cos(rotation * Math.PI / 180) * 300],
          y: [0, Math.sin(rotation * Math.PI / 180) * 300],
          filter: [
            "drop-shadow(0 0 0px rgba(255,255,255,0))",
            "drop-shadow(0 0 6px rgba(255,255,255,0.8)) blur(0.5px)",
            "drop-shadow(0 0 0px rgba(255,255,255,0))",
          ],
          transition: {
            duration,
            delay,
            ease: "easeInOut",
          },
        })
      }
    }
    animate()
  }, [controls, duration, delay, rotation])

  return (
    <motion.div
      className="absolute bg-gradient-to-r from-transparent via-white to-transparent"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={controls}
    />
  )
}

function StarField() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 100 }).map((_, i) => (
        <Star key={i} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <ShootingStar key={i} />
      ))}
    </div>
  )
}

export default function LandingPage() {
  const phrases = [
    "El Futuro de la Creación con IA",
    "Genera Videos Impresionantes",
    "Compón Música Única",
    "Crea Contenido Sin Límites",
    "Programa el Futuro",
  ]

  return (
    <div className="min-h-screen bg-[#0a0118] text-cyan-300 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-[#0a0118] to-cyan-900/30" />
        <StarField />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                AI Hub
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SignedOut>
                <Link href="/login">
                  <Button
                    className="relative group bg-purple-900/40 hover:bg-purple-900/60 text-white border-0 transition-all backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                    <span className="relative flex items-center">
                      Iniciar Sesión
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    className="relative group bg-purple-900/40 hover:bg-purple-900/60 text-white border-0 transition-all backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                    <span className="relative flex items-center">
                      Ir al Dashboard
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </SignedIn>
              <Link href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">
                Inicio
              </Link>
              <Link href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">
                Características
              </Link>
              <Link href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">
                Precios
              </Link>
            </motion.div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center">
          <motion.div
            className="h-[180px] flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 [text-shadow:_0_0_30px_rgb(236_72_153_/_0.3)]">
                <TypewriterEffect phrases={phrases} />
              </span>
            </h1>
          </motion.div>
          <motion.p
            className="text-xl text-cyan-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Desata el poder de la IA para generar contenido que desafía los límites de la imaginación.
          </motion.p>
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="flex gap-2 p-2 bg-purple-900/20 rounded-lg backdrop-blur-sm border border-cyan-500/20">
              <Input
                placeholder="Describe tu visión del futuro..."
                className="bg-transparent border-0 text-cyan-300 placeholder:text-cyan-500"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all">
                Crear con IA
              </Button>
            </div>
          </motion.div>
        </section>

        {/* New Service Showcase Section */}
        <section className="container mx-auto px-4 py-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 [text-shadow:_0_0_30px_rgb(236_72_153_/_0.3)]">
            Generación de Contenido con IA
          </h2>
          {/* Scrolling Services */}
          <div className="relative overflow-hidden mb-32">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-transparent to-purple-900/50 z-10 pointer-events-none" />
            <motion.div
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
              className="flex gap-6 mb-8"
            >
              {[
                {
                  title: "Generación de Video",
                  description: "Crea videos futuristas y efectos visuales de otro mundo",
                  icon: <Video className="h-6 w-6" />,
                  color: "from-pink-500 to-purple-500",
                },
                {
                  title: "Creación de Audio",
                  description: "Compón música electrónica y sonidos del mañana",
                  icon: <Music className="h-6 w-6" />,
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  title: "Contenido Escrito",
                  description: "Genera narrativas cyberpunk y guiones de ciencia ficción",
                  icon: <FileText className="h-6 w-6" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Desarrollo de Código",
                  description: "Programa el futuro con IA avanzada",
                  icon: <Code className="h-6 w-6" />,
                  color: "from-blue-500 to-cyan-500",
                },
                // Duplicamos los items para el efecto infinito
                {
                  title: "Generación de Video",
                  description: "Crea videos futuristas y efectos visuales de otro mundo",
                  icon: <Video className="h-6 w-6" />,
                  color: "from-pink-500 to-purple-500",
                },
                {
                  title: "Creación de Audio",
                  description: "Compón música electrónica y sonidos del mañana",
                  icon: <Music className="h-6 w-6" />,
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  title: "Contenido Escrito",
                  description: "Genera narrativas cyberpunk y guiones de ciencia ficción",
                  icon: <FileText className="h-6 w-6" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Desarrollo de Código",
                  description: "Programa el futuro con IA avanzada",
                  icon: <Code className="h-6 w-6" />,
                  color: "from-blue-500 to-cyan-500",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="min-w-[300px] group cursor-pointer"
                >
                  <div className="bg-purple-900/40 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                    <div className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-cyan-300">{service.title}</h3>
                    <p className="text-cyan-400/80">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Segunda fila con dirección opuesta */}
            <motion.div
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
              className="flex gap-6"
            >
              {[
                {
                  title: "Marketing Digital",
                  description: "Estrategias de contenido impulsadas por IA",
                  icon: <Brain className="h-6 w-6" />,
                  color: "from-pink-500 to-purple-500",
                },
                {
                  title: "Diseño Gráfico",
                  description: "Creación de diseños únicos y futuristas",
                  icon: <ImageIcon className="h-6 w-6" />,
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  title: "Edición de Video",
                  description: "Efectos especiales y transiciones automáticas",
                  icon: <Video className="h-6 w-6" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Automatización",
                  description: "Flujos de trabajo inteligentes",
                  icon: <Code className="h-6 w-6" />,
                  color: "from-blue-500 to-cyan-500",
                },
                // Duplicamos los items para el efecto infinito
                {
                  title: "Marketing Digital",
                  description: "Estrategias de contenido impulsadas por IA",
                  icon: <Brain className="h-6 w-6" />,
                  color: "from-pink-500 to-purple-500",
                },
                {
                  title: "Diseño Gráfico",
                  description: "Creación de diseños únicos y futuristas",
                  icon: <ImageIcon className="h-6 w-6" />,
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  title: "Edición de Video",
                  description: "Efectos especiales y transiciones automáticas",
                  icon: <Video className="h-6 w-6" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Automatización",
                  description: "Flujos de trabajo inteligentes",
                  icon: <Code className="h-6 w-6" />,
                  color: "from-blue-500 to-cyan-500",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="min-w-[300px] group cursor-pointer"
                >
                  <div className="bg-purple-900/40 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                    <div className={`mb-4 w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <div className="text-white">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-cyan-300">{service.title}</h3>
                    <p className="text-cyan-400/80">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image Generation Service - Creative Grid Layout */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="grid grid-cols-12 gap-6"
            >
              <div className="col-span-8">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                  >
                    <Image
                      src="https://img.freepik.com/premium-photo/system-artificial-intelligence-chatgpt-chat-bot-ai-technology-smart-robot-ai-chat-gpt-application-software-robot-application-chat-gpt-generative-ai_438099-11898.jpg"
                      alt="AI Generated Art 1"
                      width={400}
                      height={400}
                      className="rounded-2xl object-cover w-full h-[300px] transition-transform duration-300 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                      <span className="text-cyan-300 font-medium">Arte Conceptual</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer"
                  >
                    <Image
                      src="https://img.freepik.com/premium-photo/robot-with-glowing-eyes-generative-ai-art_158863-14910.jpg"
                      alt="AI Generated Art 2"
                      width={400}
                      height={400}
                      className="rounded-2xl object-cover w-full h-[300px] transition-transform duration-300 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-6">
                      <span className="text-cyan-300 font-medium">Diseño Digital</span>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="col-span-4 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Imágenes que Inspiran
                </h3>
                <p className="text-lg text-cyan-300 mb-8">
                  Transforma tus ideas en obras de arte únicas con nuestra IA.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <Button className="relative w-full bg-purple-900/50 hover:bg-purple-900/70 text-white px-6 py-4 rounded-xl border border-cyan-500/30 group-hover:border-cyan-500/50 transition-all">
                    <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Crear Arte
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Video Generation Service - Interactive Preview Layout */}
          <div className="mb-32 relative overflow-hidden rounded-3xl bg-purple-900/20 backdrop-blur-sm border border-cyan-500/20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2"
            >
              <div className="p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-6 text-pink-400">
                  &gt; Generación de Video_
                </h3>
                <p className="text-lg text-cyan-300 mb-8">
                  Crea contenido audiovisual impactante con IA. Animaciones, efectos visuales
                  y edición automática.
                </p>
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4">
                      <Video className="mr-2 h-5 w-5" />
                      Tutorial
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4">
                      <Play className="mr-2 h-5 w-5" />
                      Demo
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1626379953822-baec19c3accd"
                  alt="AI Video Generation"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Code Generation Service - Terminal Style Layout */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl" />
              <div className="relative bg-purple-900/40 backdrop-blur-sm p-8 border border-cyan-500/20">
                <div className="flex items-center mb-6 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 text-sm text-cyan-300 font-mono">~/ai-hub/code-generation</div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 font-mono text-pink-400">
                      &gt; Generación de Código_
                    </h3>
                    <p className="text-lg text-cyan-300 mb-8 font-mono">
                      $ Desarrolla más rápido con IA<br />
                      $ Genera código limpio y eficiente<br />
                      $ Resuelve problemas complejos
                    </p>
                    <div className="font-mono text-sm text-cyan-400/80">
                      <div className="mb-2">&gt; Funciones y componentes</div>
                      <div className="mb-2">&gt; APIs y microservicios</div>
                      <div>&gt; Debugging y optimización</div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative bg-purple-950/50 rounded-xl p-6 font-mono text-sm text-cyan-300">
                      <div className="mb-4">
                        <span className="text-pink-400">function</span>{" "}
                        <span className="text-cyan-300">generateCode</span>() {"{"}
                      </div>
                      <div className="pl-4 mb-4">
                        <span className="text-pink-400">const</span> ai ={" "}
                        <span className="text-cyan-300">new</span> AI();
                      </div>
                      <div className="pl-4 mb-4">
                        <span className="text-pink-400">return</span> ai.
                        <span className="group-hover:text-pink-400 transition-colors">
                          createSolution
                        </span>
                        ();
                      </div>
                      <div>{"}"}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl border border-cyan-500/30 group-hover:border-cyan-500/50 transition-all">
                    <Code className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Iniciar Proyecto
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Music Generation Service */}
          <div className="mb-32 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 rounded-3xl p-12 backdrop-blur-sm border border-cyan-500/20"
            >
              <div className="grid grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    Música del Futuro
                  </h3>
                  <p className="text-lg text-cyan-300 mb-8">
                    Compón melodías únicas, crea ritmos innovadores y produce música que desafía los límites de la creatividad con nuestra IA.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "Géneros", value: "∞" },
                      { label: "Instrumentos", value: "100+" },
                      { label: "Estilos", value: "50+" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-purple-900/30 rounded-xl p-4 border border-cyan-500/20"
                      >
                        <div className="text-2xl font-bold text-pink-400 mb-1">{stat.value}</div>
                        <div className="text-sm text-cyan-300">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative inline-block group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <Button className="relative bg-purple-900/50 hover:bg-purple-900/70 text-white px-8 py-4 rounded-xl border border-cyan-500/30 group-hover:border-cyan-500/50 transition-all">
                      <Music className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                      Comenzar a Componer
                    </Button>
                  </motion.div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
                  <div className="grid grid-cols-2 gap-4 relative">
                    {[
                      { type: "Melodía", progress: "85%" },
                      { type: "Ritmo", progress: "92%" },
                      { type: "Armonía", progress: "78%" },
                      { type: "Producción", progress: "88%" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-purple-900/30 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                      >
                        <div className="text-sm text-cyan-300 mb-2">{item.type}</div>
                        <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.progress }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 group-hover:from-pink-400 group-hover:to-purple-400 transition-colors"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-4 relative">
          <motion.div
            className="flex flex-col items-center justify-center relative text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="h-[120px] flex items-center justify-center">
              <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 [text-shadow:_0_0_30px_rgb(236_72_153_/_0.3)]">
                <TypewriterEffect 
                  phrases={["Inteligencia Artificial", "Creatividad Sin Límites"]}
                  delay={100}
                  pauseTime={2000}
                />
              </h1>
            </div>
            <p className="text-xl text-cyan-300/80 max-w-2xl mx-auto">
              Explora el futuro de la creación digital con nuestra avanzada plataforma de IA
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-2xl" />
            
            {/* Robot Image */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative mb-8"
            >
              <Image
                src="https://png.pngtree.com/png-vector/20240607/ourmid/pngtree-humanoid-robot-deep-in-thought-png-image_12619395.png"
                alt="AI Robot"
                width={300}
                height={300}
                className="relative z-10"
              />
            </motion.div>

            {/* Button with glow effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <Button className="relative bg-purple-900/50 hover:bg-purple-900/70 text-white px-8 py-4 rounded-xl border border-cyan-500/30 group-hover:border-cyan-500/50 transition-all">
                Inicia Tu Viaje
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 mt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["Innovaciones", "Comunidad", "Recursos", "Legal"].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="font-bold mb-4 text-pink-400">{category}</h3>
                  <ul className="space-y-2 text-cyan-300">
                    {["Explorar", "Unirse", "Aprender"].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:text-pink-400 transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-cyan-500/20 text-center text-cyan-300">
              <p>&copy; {new Date().getFullYear()} AI Hub. Forjando el Futuro de la Creatividad.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export const dynamic = 'force-static';

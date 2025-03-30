"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  phrases: string[]
  delay?: number
  pauseTime?: number
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ phrases, delay = 100, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isPaused) {
          return
        }

        if (!isDeleting) {
          if (currentIndex < phrases[currentPhrase].length) {
            setCurrentText((prev) => prev + phrases[currentPhrase][currentIndex])
            setCurrentIndex((prev) => prev + 1)
          } else {
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setIsDeleting(true)
            }, pauseTime)
          }
        } else {
          if (currentIndex > 0) {
            setCurrentText((prev) => prev.slice(0, -1))
            setCurrentIndex((prev) => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentPhrase((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? delay / 2 : delay,
    )

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, isDeleting, currentPhrase, phrases, isPaused, pauseTime])

  return <span>{currentText}</span>
}


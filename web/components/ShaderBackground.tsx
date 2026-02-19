'use client'

import { GrainGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"

export default function ShaderBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    // Update dimensions on mount and resize
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <GrainGradient
        width={dimensions.width}
        height={dimensions.height}
        colors={['#667eea', '#764ba2', '#4facfe', '#00f2fe']}
        colorBack="#0a0a0f"
        softness={0.6}
        intensity={0.4}
        noise={0.15}
        shape="corners"
        speed={0.8}
      />

      {/* Lighter dark overlay to match STYLING.MD bg-primary */}
      <div className="absolute inset-0 bg-[#0a0a0f]/40" />
    </div>
  )
}

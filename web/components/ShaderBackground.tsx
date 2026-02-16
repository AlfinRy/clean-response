'use client'

import { GrainGradient } from "@paper-design/shaders-react"

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <GrainGradient width={2000} height={720} colors={['#7300ff', '#eba8ff', '#00bfff', '#2b00ff']} colorBack="#000000" softness={0.5} intensity={0.5} noise={0.25} shape="corners" speed={1} />
      {/* Animated gradient orbs */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} /> */}

      {/* Dark overlay to match STYLING.MD bg-primary */}
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />

      {/* Subtle mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #4facfe 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 15s ease infinite'
        }}
      />
    </div>
  )
}

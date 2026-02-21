export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated CSS Gradient Background - Lightweight alternative to WebGL shader */}
      <div className="absolute inset-0 gradient-bg opacity-30" />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
    </div>
  )
}

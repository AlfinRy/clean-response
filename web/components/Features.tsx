const features = [
  {
    name: 'typescript',
    description: 'Full TypeScript support with comprehensive type definitions for IntelliSense and autocomplete.',
  },
  {
    name: 'lightweight',
    description: 'Zero dependencies. Tiny bundle size under 1KB minified.',
  },
  {
    name: 'express-ready',
    description: 'Works seamlessly with Express, Fastify, and vanilla Node.js applications.',
  },
  {
    name: 'clean-api',
    description: 'Simple, intuitive functions that just work. No boilerplate required.',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-12 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">Features</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">What you get</span>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name} className="glass-card">
            <div className="font-mono text-sm mb-2">
              <span className="text-gray-500">+</span>
              <span className="ml-2 text-white">{feature.name}</span>
            </div>
            <div className="text-sm text-gray-400 pl-4">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Feather, Zap, Layers } from 'lucide-react'

const features = [
  {
    name: 'TypeScript Support',
    description: 'Full TypeScript support with comprehensive type definitions for IntelliSense and autocomplete.',
    icon: Code,
    badge: 'Type-Safe',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    name: 'Lightweight',
    description: 'Zero dependencies. Tiny bundle size under 1KB minified.',
    icon: Feather,
    badge: '< 1KB',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    name: 'Framework Ready',
    description: 'Works seamlessly with Express, Fastify, and vanilla Node.js applications.',
    icon: Zap,
    badge: 'Universal',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    name: 'Clean API',
    description: 'Simple, intuitive functions that just work. No boilerplate required.',
    icon: Layers,
    badge: 'Simple',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-16 md:py-20 max-w-6xl mx-auto scroll-mt-20 section-features">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge className="mb-2 bg-purple-500/10 text-purple-400 border-purple-500/20">Features</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Everything you need
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Built for developers who value simplicity and type safety
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.name}
              className="border-purple-500/20 bg-card/50 backdrop-blur-sm hover:bg-purple-500/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg ${feature.bgColor} group-hover:bg-purple-500/20 transition-colors`}>
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <Badge variant="outline" className={`text-xs font-mono ${feature.color} border-purple-500/30`}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Divider */}
      <div className="section-divider mt-16 !bg-purple-500/30" />
    </section>
  )
}

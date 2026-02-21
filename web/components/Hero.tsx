'use client'

import { Github, Package, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CopyButton from './CopyButton'

export default function Hero() {
  const handleGetStarted = () => {
    const element = document.getElementById('quick-start')
    if (element) {
      const yOffset = -100 // Offset untuk fixed navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })

      // Add highlight effect after scroll completes
      setTimeout(() => {
        element.classList.add('highlight-section')
        setTimeout(() => {
          element.classList.remove('highlight-section')
        }, 2000)
      }, 900)
    }
  }

  return (
    <section className="px-4 py-16 md:py-24 max-w-5xl mx-auto scroll-mt-20">
      <div className="space-y-8 md:space-y-12">
        {/* Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            v1.2.0 • Lightweight • Type-Safe
          </Badge>
        </div>

        {/* Logo with glow effect */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Card className="relative border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <img
                  src="/client-response-logo.svg"
                  alt="clean-response logo"
                  className="w-20 h-20"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            clean-
            <span className="gradient-text">response</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Standardize API responses with type-safe, lightweight functions.
            <br />
            <span className="text-base">Works like your response formatter. Add, update, and remove with clean functions you already know.</span>
          </p>
        </div>

        {/* Install command */}
        <div className="flex justify-center">
          <CopyButton code="npm install @leviosary/clean-response">
            <Card className="border-primary/20 bg-card/50 backdrop-blur max-w-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 font-mono text-sm overflow-x-auto">
                  <span className="text-muted-foreground">$</span>
                  <span className="text-foreground">npm install @leviosary/clean-response</span>
                </div>
              </CardContent>
            </Card>
          </CopyButton>
        </div>

        {/* Usage preview */}
        <div className="flex justify-center">
          <CopyButton code={`import { success, error, paginate } from '@leviosary/clean-response'\nreturn success(data, "User created")`}>
            <Card className="border-border/50 bg-card/30 backdrop-blur max-w-3xl">
              <CardContent className="p-4">
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>
                    <span className="text-purple-400">import</span>{' '}
                    <span className="text-cyan-300">{`{ success, error, paginate }`}</span>{' '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">'@leviosary/clean-response'</span>
                    <br />
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-blue-400">success</span>
                    <span className="text-foreground">(data, "User created")</span>
                  </code>
                </pre>
              </CardContent>
            </Card>
          </CopyButton>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="group" onClick={handleGetStarted}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/AlfinRy/clean-response" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <a href="https://www.npmjs.com/package/@leviosary/clean-response" target="_blank" rel="noopener noreferrer">
              <Package className="mr-2 h-4 w-4" />
              npm
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">0 dependencies</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">&lt;1KB minified</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">TypeScript</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}

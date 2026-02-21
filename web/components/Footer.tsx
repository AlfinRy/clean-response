import { Github, Package, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm px-4 py-12 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/client-response-logo.svg"
                alt="clean-response logo"
                className="w-6 h-6"
              />
              <span className="font-mono font-semibold text-foreground">
                clean-response
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline" className="font-mono text-xs">
                MIT License
              </Badge>
              <span>•</span>
              <span>{currentYear}</span>
            </div>
          </div>

          {/* Center - Made with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by{' '}
            <a
              href="https://github.com/AlfinRy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              alfinry
            </a>
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/AlfinRy/clean-response"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.npmjs.com/package/@leviosary/clean-response"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="npm"
              >
                <Package className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

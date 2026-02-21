'use client'

import { useState, useEffect } from 'react'
import { Github, Package, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Examples', href: '#examples' },
  { name: 'Quick Start', href: '#quick-start' },
]

const externalLinks = [
  { name: 'GitHub', href: 'https://github.com/AlfinRy/clean-response', icon: Github },
  { name: 'npm', href: 'https://www.npmjs.com/package/@leviosary/clean-response', icon: Package },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank')
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-border/50 bg-background/80 backdrop-blur-lg shadow-sm'
          : 'border-transparent bg-background/50 backdrop-blur-sm'
      }`}
    >
      <nav className="px-4 py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 group"
          >
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <img
                src="/client-response-logo.svg"
                alt="clean-response logo"
                className="w-6 h-6"
              />
            </div>
            <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
              clean-response
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                size="sm"
                onClick={() => scrollTo(link.href)}
                className="text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Button>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            {externalLinks.map((link) => {
              const Icon = link.icon
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollTo(link.href)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {link.name}
                </Button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  onClick={() => scrollTo(link.href)}
                  className="justify-start text-muted-foreground hover:text-foreground"
                >
                  {link.name}
                </Button>
              ))}
              <div className="h-px bg-border my-2" />
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.name}
                    variant="ghost"
                    onClick={() => scrollTo(link.href)}
                    className="justify-start text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.name}
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

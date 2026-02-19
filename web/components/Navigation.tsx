'use client'

import { useState, useEffect } from 'react'
import { Github, Package, Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Examples', href: '#examples' },
  { name: 'Docs', href: '#docs' },
  { name: 'GitHub', href: 'https://github.com/AlfinRy/clean-response', external: true },
  { name: 'npm', href: 'https://www.npmjs.com/package/@leviosary/clean-response', external: true },
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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300 ease-in-out ${
        scrolled ? 'glass-card border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="px-4 py-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img
              src="/client-response-logo.svg"
              alt="clean-response logo"
              className="w-8 h-8"
            />
            <span className="font-mono text-white font-semibold">clean-response</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
              >
                {link.name === 'GitHub' && <Github className="w-4 h-4" />}
                {link.name === 'npm' && <Package className="w-4 h-4" />}
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-left"
                >
                  {link.name === 'GitHub' && <Github className="w-4 h-4" />}
                  {link.name === 'npm' && <Package className="w-4 h-4" />}
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

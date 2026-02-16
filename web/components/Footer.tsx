export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="font-mono text-gray-500">
            <span>MIT License</span>
            <span className="mx-2">•</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-gray-500">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

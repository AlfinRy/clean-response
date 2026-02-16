export default function Hero() {
  return (
    <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="glass-card p-6">
            <img
              src="/client-response-logo.svg"
              alt="clean-response logo"
              className="w-16 h-16"
            />
          </div>
        </div>

        {/* Terminal-style header */}
        <div className="font-mono text-sm text-gray-400 border-b border-white/10 pb-4">
          <span className="text-gray-500">Standardize API responses</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Type-safe. Lightweight. Clean.</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center gradient-text">
          clean-response
        </h1>

        {/* Tagline */}
        <p className="text-lg text-gray-400 max-w-2xl text-center">
          Works like your response formatter. Add, update, and remove with clean functions you already know.
        </p>

        {/* Install commands - terminal style with glass effect */}
        <div className="glass-card font-mono text-sm overflow-x-auto">
          <div className="space-y-2">
            <div>
              <span className="text-gray-500">$</span>{' '}
              <span className="text-white">npm install clean-response</span>
            </div>
            <div>
              <span className="text-gray-500">$</span>{' '}
              <span className="text-white">yarn add clean-response</span>
            </div>
            <div>
              <span className="text-gray-500">$</span>{' '}
              <span className="text-white">pnpm add clean-response</span>
            </div>
          </div>
        </div>

        {/* Usage examples with glass effect */}
        <div className="glass-card font-mono text-sm overflow-x-auto">
          <div className="space-y-2">
            <div>
              <span className="text-gray-500">import</span>{' '}
              <span className="text-white">{`{ success, error, paginate }`}</span>{' '}
              <span className="text-gray-500">from</span>{' '}
              <span className="text-green-400">'clean-response'</span>
            </div>
            <div className="text-gray-500">// Success response</div>
            <div>
              <span className="text-gray-500">return</span>{' '}
              <span className="text-blue-400">success</span>
              <span className="text-white">(data, {"\"User created\""})</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <a
            href="#get-started"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Read Docs
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://npmjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            npm
          </a>
        </div>
      </div>
    </section>
  )
}

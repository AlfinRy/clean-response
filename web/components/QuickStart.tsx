export default function QuickStart() {
  return (
    <section id="docs" className="px-4 py-16 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">Quick Start</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Get up and running in seconds</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1: Install */}
        <div className="glass-card">
          <div className="font-mono text-sm mb-3">
            <span className="text-purple-400">1.</span>
            <span className="ml-2 text-white">Install the package</span>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-md overflow-x-auto mb-3">
            <div className="px-4 py-3 font-mono text-sm">
              <span className="text-gray-500">$</span>{' '}
              <span className="text-white">npm install @leviosary/clean-response</span>
            </div>
          </div>
        </div>

        {/* Step 2: Import */}
        <div className="glass-card">
          <div className="font-mono text-sm mb-3">
            <span className="text-purple-400">2.</span>
            <span className="ml-2 text-white">Import functions</span>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-md overflow-x-auto mb-3">
            <pre className="px-4 py-3 text-sm font-mono text-gray-300">
{`import { success, error, paginate } from '@leviosary/clean-response'`}
            </pre>
          </div>
        </div>

        {/* Step 3: Use */}
        <div className="glass-card">
          <div className="font-mono text-sm mb-3">
            <span className="text-purple-400">3.</span>
            <span className="ml-2 text-white">Use in your routes</span>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-md overflow-x-auto mb-3">
            <pre className="px-4 py-3 text-sm font-mono text-gray-300">
{`// Success response
res.json(success(user, "User created"))

// Error response
res.json(error("User not found", 404))

// Paginated response
res.json(paginate(users, page, limit))`}
            </pre>
          </div>
        </div>

        {/* Done message */}
        <div className="glass-card text-center py-4">
          <span className="text-gray-400">That's it! Your API responses are now standardized. 🎉</span>
        </div>
      </div>
    </section>
  )
}

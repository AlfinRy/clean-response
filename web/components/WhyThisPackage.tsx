import CopyButton from './CopyButton'

const examples = [
  {
    title: 'before',
    description: 'Inconsistent response formats',
    code: `res.send({ data: user, status: 'ok' })
res.json({ success: true, result: user })
res.json({ user, timestamp: Date.now() })`,
  },
  {
    title: 'after',
    description: 'Consistent, predictable responses',
    code: `res.json(success(user))`,
  },
]

export default function WhyThisPackage() {
  return (
    <section className="px-4 py-12 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">Why</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Problem solved</span>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        {examples.map((example) => (
          <div key={example.title} className="glass-card">
            <div className="font-mono text-sm mb-2">
              <span className="text-gray-500">#{example.title}</span>
            </div>
            <div className="text-sm text-gray-400 mb-3 pl-4">
              {example.description}
            </div>
            <CopyButton code={example.code}>
              <div className="bg-black/30 border border-white/5 rounded-md overflow-x-auto">
                <pre className="p-3 text-sm font-mono text-gray-300">
                  {example.code}
                </pre>
              </div>
            </CopyButton>
          </div>
        ))}
      </div>
    </section>
  )
}

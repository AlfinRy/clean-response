const codeExample = `import { success, error, paginate } from '@leviosary/clean-response'

// Success response
app.get('/users/:id', (req, res) => {
  const user = await findUser(req.params.id)
  return res.json(success(user, 'User retrieved successfully'))
})

// Error response
app.delete('/users/:id', (req, res) => {
  const deleted = await deleteUser(req.params.id)
  if (!deleted) {
    return res.status(404).json(error('User not found', 404))
  }
  return res.json(success(null, 'User deleted'))
})

// Paginated response
app.get('/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const { users, total } = await getUsers(page, limit)

  return res.json(paginate(users, {
    page: Number(page),
    perPage: Number(limit),
    total,
    totalPages: Math.ceil(total / limit)
  }))
})`

export default function CodeExample() {
  return (
    <section id="examples" className="px-4 py-12 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">Example</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Usage in Express.js</span>
        </div>
      </div>

      {/* Code Block */}
      <div className="glass-card overflow-x-auto">
        <pre className="text-sm font-mono">
          {codeExample.split('\n').map((line, i) => {
            const isComment = line.trim().startsWith('//')
            const isImport = line.includes('import')

            return (
              <div key={i} className={isComment ? 'text-gray-500' : 'text-gray-300'}>
                {isImport ? (
                  <>
                    <span className="text-purple-400">import</span>{' '}
                    <span className="text-cyan-300">{`{ success, error, paginate }`}</span>{' '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">{`'@leviosary/clean-response'`}</span>
                  </>
                ) : (
                  line
                )}
              </div>
            )
          })}
        </pre>
      </div>
    </section>
  )
}

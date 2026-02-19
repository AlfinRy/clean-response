import CopyButton from './CopyButton'

const examples = [
  {
    title: 'Error Handling',
    description: 'Handle errors consistently with proper status codes',
    framework: 'Express.js',
    code: `import { success, error } from '@leviosary/clean-response'

app.get('/users/:id', async (req, res) => {
  try {
    const user = await findUser(req.params.id)

    if (!user) {
      return res
        .status(404)
        .json(error('User not found', 404))
    }

    return res.json(success(user, 'User retrieved'))
  } catch (err) {
    return res
      .status(500)
      .json(error('Internal server error', 500))
  }
})`,
  },
  {
    title: 'Pagination',
    description: 'Return paginated data with metadata',
    framework: 'Express.js',
    code: `import { paginate } from '@leviosary/clean-response'

app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const { users, total } = await getUsers({
    page: Number(page),
    limit: Number(limit),
  })

  return res.json(paginate(users, {
    page: Number(page),
    perPage: Number(limit),
    total,
    totalPages: Math.ceil(total / limit),
  }))
})`,
  },
  {
    title: 'Fastify Integration',
    description: 'Works seamlessly with Fastify framework',
    framework: 'Fastify',
    code: `import { success, error } from '@leviosary/clean-response'

fastify.get('/users/:id', async (request, reply) => {
  const user = await findUser(request.params.id)

  if (!user) {
    return reply
      .status(404)
      .send(error('User not found', 404))
  }

  return reply.send(success(user))
})`,
  },
  {
    title: 'Vanilla Node.js',
    description: 'Use with any Node.js HTTP server',
    framework: 'Node.js HTTP',
    code: `import { success, error } from '@leviosary/clean-response'
import { createServer } from 'http'

const server = createServer(async (req, res) => {
  // Set headers
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'GET' && req.url === '/api/users') {
    const users = await getUsers()

    // Send success response
    res.end(JSON.stringify(success(users)))
  } else {
    // Send error response
    res.statusCode = 404
    res.end(JSON.stringify(error('Route not found', 404)))
  }
})

server.listen(3000)`,
  },
]

export default function MoreExamples() {
  return (
    <section id="more-examples" className="px-4 py-16 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">More Examples</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Different frameworks & use cases</span>
        </div>
      </div>

      <div className="space-y-8">
        {examples.map((example) => (
          <div key={example.title} className="glass-card">
            {/* Title & Framework */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-lg text-white">{example.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                {example.framework}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4">
              {example.description}
            </p>

            {/* Code */}
            <CopyButton code={example.code}>
              <div className="bg-black/30 border border-white/5 rounded-md overflow-x-auto">
                <pre className="p-4 text-sm font-mono text-gray-300">
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

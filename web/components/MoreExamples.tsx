import CopyButton from './CopyButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Database, Zap, Server } from 'lucide-react'

const examples = [
  {
    title: 'Error Handling',
    description: 'Handle errors consistently with proper status codes',
    framework: 'Express.js',
    icon: AlertTriangle,
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
    icon: Database,
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
    icon: Zap,
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
    icon: Server,
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
    <section id="more-examples" className="px-4 py-16 md:py-20 max-w-6xl mx-auto scroll-mt-20 section-examples">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge className="mb-2 bg-teal-500/10 text-teal-400 border-teal-500/20">More Examples</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Works with any framework
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Different frameworks & use cases
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {examples.map((example) => {
          const Icon = example.icon
          return (
            <Card key={example.title} className="border-teal-500/20 bg-card/50 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 rounded-lg bg-teal-500/10">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs text-teal-400 border-teal-500/30">
                    {example.framework}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <CopyButton code={example.code} className="rounded-lg overflow-hidden">
                  <div className="code-block bg-background/50 rounded-none rounded-b-lg max-h-[320px] overflow-y-auto scrollbar-thin border-teal-500/10">
                    <pre className="text-xs font-mono text-muted-foreground p-4">
                      {example.code}
                    </pre>
                  </div>
                </CopyButton>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Divider */}
      <div className="section-divider mt-16 !bg-teal-500/30" />
    </section>
  )
}

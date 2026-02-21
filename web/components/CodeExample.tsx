import CopyButton from './CopyButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileCode } from 'lucide-react'

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
    <section id="examples" className="px-4 py-16 md:py-20 max-w-5xl mx-auto scroll-mt-20 section-code">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge className="mb-2 bg-blue-500/10 text-blue-400 border-blue-500/20">Example</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Usage in Express.js
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how easy it is to integrate clean-response into your API
        </p>
      </div>

      {/* Code Block */}
      <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-blue-400">
            <FileCode className="h-5 w-5" />
            Example: REST API with clean-response
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CopyButton code={codeExample}>
            <div className="code-block bg-background/50 border-blue-500/10">
              <pre className="text-sm font-mono">
                {codeExample.split('\n').map((line, i) => {
                  const isComment = line.trim().startsWith('//')
                  const isImport = line.includes('import')
                  const isKeyword = /\b(await|return|const|if|else|function)\b/.test(line) && !isComment

                  return (
                    <div key={i} className={isComment ? 'text-muted-foreground' : ''}>
                      {isImport ? (
                        <>
                          <span className="text-purple-400">import</span>{' '}
                          <span className="text-cyan-300">{`{ success, error, paginate }`}</span>{' '}
                          <span className="text-purple-400">from</span>{' '}
                          <span className="text-green-400">{`'@leviosary/clean-response'`}</span>
                        </>
                      ) : isKeyword ? (
                        <span className="text-blue-300">{line}</span>
                      ) : (
                        <span className="text-muted-foreground">{line}</span>
                      )}
                    </div>
                  )
                })}
              </pre>
            </div>
          </CopyButton>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="section-divider mt-16 !bg-blue-500/30" />
    </section>
  )
}

import CopyButton from './CopyButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Download, Import, Zap } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Download,
    title: 'Install the package',
    description: 'Add clean-response to your project',
    code: 'npm install @leviosary/clean-response',
  },
  {
    number: 2,
    icon: Import,
    title: 'Import functions',
    description: 'Import the helper functions you need',
    code: "import { success, error, paginate } from '@leviosary/clean-response'",
  },
  {
    number: 3,
    icon: Zap,
    title: 'Use in your routes',
    description: 'Start standardizing your API responses',
    code: `// Success response
res.json(success(user, "User created"))

// Error response
res.json(error("User not found", 404))

// Paginated response
res.json(paginate(users, page, limit))`,
  },
]

export default function QuickStart() {
  return (
    <section id="quick-start" className="px-4 py-16 md:py-20 max-w-5xl mx-auto scroll-mt-20 section-quickstart">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge className="mb-2 bg-green-500/10 text-green-400 border-green-500/20">Quick Start</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Get up and running in seconds
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Three simple steps to standardize your API responses
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <Card key={step.number} className="border-green-500/20 bg-card/50 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10">
                      <Icon className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs text-green-400 border-green-500/30">Step {step.number}</Badge>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CopyButton code={step.code}>
                  <div className="code-block bg-background/50 border-green-500/10">
                    <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                      {step.code}
                    </pre>
                  </div>
                </CopyButton>
              </CardContent>
            </Card>
          )
        })}

        {/* Completion message */}
        <Card className="border-green-500/20 bg-green-500/5 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center gap-3 py-6">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
            <p className="text-foreground font-medium">
              That's it! Your API responses are now standardized. 🎉
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Divider */}
      <div className="section-divider mt-16 !bg-green-500/30" />
    </section>
  )
}

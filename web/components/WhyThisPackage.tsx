import CopyButton from './CopyButton'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

const examples = [
  {
    title: 'before',
    description: 'Inconsistent response formats',
    code: `res.send({ data: user, status: 'ok' })
res.json({ success: true, result: user })
res.json({ user, timestamp: Date.now() })`,
    icon: XCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
  {
    title: 'after',
    description: 'Consistent, predictable responses',
    code: `res.json(success(user))`,
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
]

export default function WhyThisPackage() {
  return (
    <section className="px-4 py-16 md:py-20 max-w-5xl mx-auto scroll-mt-20 relative section-grid">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge variant="secondary" className="mb-2">Why This Package</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Problem solved
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Say goodbye to inconsistent API responses
        </p>
      </div>

      {/* Examples */}
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {examples.map((example) => {
          const Icon = example.icon
          return (
            <Card
              key={example.title}
              className={`border ${example.borderColor} ${example.bgColor} bg-card/50 backdrop-blur-sm`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`h-5 w-5 ${example.iconColor}`} />
                  <Badge variant="outline" className="capitalize font-mono">
                    {example.title}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {example.description}
                </p>
                <CopyButton code={example.code}>
                  <div className="code-block bg-background/80">
                    <pre className="text-sm font-mono text-muted-foreground">
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
      <div className="section-divider mt-16" />
    </section>
  )
}

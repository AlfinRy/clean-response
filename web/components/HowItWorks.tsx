import CopyButton from './CopyButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Layers } from 'lucide-react'

const responseExamples = [
  {
    name: 'Success Response',
    description: 'Standard success response with data and optional message',
    code: `{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User created successfully"
}`,
    function: 'success(data, message)',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    badgeBg: 'bg-green-500/10',
    badgeText: 'text-green-400',
    badgeBorder: 'border-green-500/30',
  },
  {
    name: 'Error Response',
    description: 'Error response with message and HTTP status code',
    code: `{
  "success": false,
  "error": "User not found",
  "statusCode": 404
}`,
    function: 'error(message, statusCode)',
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    badgeBg: 'bg-red-500/10',
    badgeText: 'text-red-400',
    badgeBorder: 'border-red-500/30',
  },
  {
    name: 'Paginated Response',
    description: 'Paginated data with metadata for easy frontend handling',
    code: `{
  "success": true,
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 100,
    "totalPages": 10
  }
}`,
    function: 'paginate(data, options)',
    icon: Layers,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    badgeBorder: 'border-blue-500/30',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 md:py-20 max-w-6xl mx-auto scroll-mt-20 section-howitworks">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge className="mb-2 bg-rose-500/10 text-rose-400 border-rose-500/20">How It Works</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Response structure
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          All responses follow a consistent, predictable structure
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {responseExamples.map((example) => {
          const Icon = example.icon
          return (
            <Card key={example.name} className={`border ${example.borderColor} bg-card/50 backdrop-blur-sm hover:opacity-80 transition-all duration-300`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${example.bgColor}`}>
                    <Icon className={`h-5 w-5 ${example.color}`} />
                  </div>
                  <Badge variant="outline" className={`font-mono text-xs ${example.badgeText} ${example.badgeBg} ${example.badgeBorder}`}>
                    {example.function}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{example.name}</CardTitle>
                <CardDescription className="text-sm">
                  {example.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CopyButton code={example.code}>
                  <div className={`code-block bg-background/50 ${example.borderColor}`}>
                    <pre className="text-xs font-mono text-muted-foreground">
                      {example.code}
                    </pre>
                  </div>
                </CopyButton>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Note */}
      <Card className="mt-8 border-rose-500/20 bg-rose-500/5 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center gap-3 py-6">
          <CheckCircle className="h-5 w-5 text-rose-400" />
          <p className="text-muted-foreground text-sm">
            Your frontend knows exactly what to expect! 🎯
          </p>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="section-divider mt-16 !bg-rose-500/30" />
    </section>
  )
}

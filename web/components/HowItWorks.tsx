import CopyButton from './CopyButton'

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
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16 max-w-4xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">How It Works</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Response structure</span>
        </div>
      </div>

      <div className="space-y-8">
        {responseExamples.map((example) => (
          <div key={example.name} className="glass-card">
            {/* Function signature */}
            <div className="font-mono text-sm mb-2">
              <span className="text-purple-400">{example.function}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4 pl-4">
              {example.description}
            </p>

            {/* JSON response with copy button */}
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

      {/* Note */}
      <div className="mt-8 glass-card text-center py-4">
        <span className="text-gray-400 text-sm">
          All responses follow a consistent, predictable structure. Your frontend knows exactly what to expect! 🎯
        </span>
      </div>
    </section>
  )
}

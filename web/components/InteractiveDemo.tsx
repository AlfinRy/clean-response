'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import CopyButton from './CopyButton'

type FunctionType = 'success' | 'error' | 'paginate'

export default function InteractiveDemo() {
  const [funcType, setFuncType] = useState<FunctionType>('success')
  const [dataInput, setDataInput] = useState('{\n  "id": 1,\n  "name": "John Doe",\n  "email": "john@example.com"\n}')
  const [message, setMessage] = useState('User retrieved successfully')
  const [errorMessage, setErrorMessage] = useState('User not found')
  const [statusCode, setStatusCode] = useState('404')
  const [page, setPage] = useState('1')
  const [perPage, setPerPage] = useState('10')
  const [total, setTotal] = useState('100')

  const generateResponse = () => {
    try {
      switch (funcType) {
        case 'success':
          return JSON.stringify({
            success: true,
            data: dataInput ? JSON.parse(dataInput) : null,
            message: message || undefined,
          }, null, 2)
        case 'error':
          return JSON.stringify({
            success: false,
            error: errorMessage,
            statusCode: parseInt(statusCode) || 400,
          }, null, 2)
        case 'paginate':
          const totalNum = parseInt(total) || 0
          const perPageNum = parseInt(perPage) || 10
          const pageNum = parseInt(page) || 1
          return JSON.stringify({
            success: true,
            data: dataInput ? JSON.parse(dataInput) : [],
            pagination: {
              page: pageNum,
              perPage: perPageNum,
              total: totalNum,
              totalPages: Math.ceil(totalNum / perPageNum),
            },
          }, null, 2)
      }
    } catch (e) {
      return JSON.stringify({
        error: 'Invalid JSON input',
        hint: 'Check your JSON syntax',
      }, null, 2)
    }
  }

  const responseOutput = generateResponse()

  return (
    <section id="demo" className="px-4 py-16 md:py-20 max-w-6xl mx-auto scroll-mt-20 section-demo">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge className="mb-2 bg-amber-500/10 text-amber-400 border-amber-500/20">Interactive Demo</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Try it yourself
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          See how your API responses will look in real-time
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Function Selector */}
          <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Select Function</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={funcType} onValueChange={(v) => setFuncType(v as FunctionType)}>
                <TabsList className="grid w-full grid-cols-3 bg-amber-500/10 border-amber-500/20">
                  <TabsTrigger value="success">success()</TabsTrigger>
                  <TabsTrigger value="error">error()</TabsTrigger>
                  <TabsTrigger value="paginate">paginate()</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Data Input (for success & paginate) */}
          {(funcType === 'success' || funcType === 'paginate') && (
            <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Data (JSON)</CardTitle>
                <CardDescription>Enter the data you want to return</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={dataInput}
                  onChange={(e) => setDataInput(e.target.value)}
                  className="font-mono text-sm min-h-[120px] bg-background/50"
                  placeholder='{\n  "key": "value"\n}'
                />
              </CardContent>
            </Card>
          )}

          {/* Message Input (for success) */}
          {funcType === 'success' && (
            <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Success Message</CardTitle>
                <CardDescription>Optional success message</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Success message"
                  className="font-mono"
                />
              </CardContent>
            </Card>
          )}

          {/* Error Inputs (for error) */}
          {funcType === 'error' && (
            <>
              <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Error Message</CardTitle>
                  <CardDescription>Description of the error</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                    placeholder="Error message"
                    className="font-mono"
                  />
                </CardContent>
              </Card>

              <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Status Code</CardTitle>
                  <CardDescription>HTTP status code to return</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="number"
                    value={statusCode}
                    onChange={(e) => setStatusCode(e.target.value)}
                    placeholder="400"
                    className="font-mono"
                  />
                </CardContent>
              </Card>
            </>
          )}

          {/* Pagination Options (for paginate) */}
          {funcType === 'paginate' && (
            <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Pagination Options</CardTitle>
                <CardDescription>Configure pagination parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Page</label>
                    <Input
                      type="number"
                      value={page}
                      onChange={(e) => setPage(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Per Page</label>
                    <Input
                      type="number"
                      value={perPage}
                      onChange={(e) => setPerPage(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total</label>
                    <Input
                      type="number"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card className="border-amber-500/20 bg-card/50 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Output
                <Badge variant="secondary" className="text-xs">Real-time</Badge>
              </CardTitle>
              <CardDescription>Generated API response</CardDescription>
            </CardHeader>
            <CardContent>
              <CopyButton code={responseOutput}>
                <div className="code-block min-h-[400px] bg-background/50 border-amber-500/10">
                  <pre className="text-sm font-mono text-muted-foreground">
                    {responseOutput}
                  </pre>
                </div>
              </CopyButton>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider mt-16 !bg-amber-500/30" />
    </section>
  )
}

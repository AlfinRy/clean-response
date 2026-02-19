'use client'

import { useState } from 'react'
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
    <section id="demo" className="px-4 py-16 max-w-5xl mx-auto scroll-mt-20">
      {/* Section Header - terminal style */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <div className="font-mono text-sm">
          <span className="text-gray-500">Interactive Demo</span>
          <span className="mx-2">{'>'}</span>
          <span className="text-gray-400">Try it yourself</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Input</h3>

          {/* Function Selector */}
          <div className="glass-card">
            <label className="block text-sm text-gray-400 mb-2">Function</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFuncType('success')}
                className={`flex-1 px-4 py-2 rounded-md font-mono text-sm transition-colors ${
                  funcType === 'success'
                    ? 'bg-[#667eea] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                success()
              </button>
              <button
                onClick={() => setFuncType('error')}
                className={`flex-1 px-4 py-2 rounded-md font-mono text-sm transition-colors ${
                  funcType === 'error'
                    ? 'bg-[#667eea] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                error()
              </button>
              <button
                onClick={() => setFuncType('paginate')}
                className={`flex-1 px-4 py-2 rounded-md font-mono text-sm transition-colors ${
                  funcType === 'paginate'
                    ? 'bg-[#667eea] text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                paginate()
              </button>
            </div>
          </div>

          {/* Data Input (for success & paginate) */}
          {(funcType === 'success' || funcType === 'paginate') && (
            <div className="glass-card">
              <label className="block text-sm text-gray-400 mb-2">Data (JSON)</label>
              <textarea
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                className="w-full h-32 bg-black/30 border border-white/5 rounded-md p-3 font-mono text-sm text-gray-300 resize-none focus:outline-none focus:border-[#667eea]/50"
                placeholder='{\n  "key": "value"\n}'
              />
            </div>
          )}

          {/* Message Input (for success) */}
          {funcType === 'success' && (
            <div className="glass-card">
              <label className="block text-sm text-gray-400 mb-2">Message (optional)</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/30 border border-white/5 rounded-md px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#667eea]/50"
                placeholder="Success message"
              />
            </div>
          )}

          {/* Error Message (for error) */}
          {funcType === 'error' && (
            <div className="glass-card">
              <label className="block text-sm text-gray-400 mb-2">Error Message</label>
              <input
                type="text"
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                className="w-full bg-black/30 border border-white/5 rounded-md px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#667eea]/50"
                placeholder="Error message"
              />
            </div>
          )}

          {/* Status Code (for error) */}
          {funcType === 'error' && (
            <div className="glass-card">
              <label className="block text-sm text-gray-400 mb-2">Status Code</label>
              <input
                type="number"
                value={statusCode}
                onChange={(e) => setStatusCode(e.target.value)}
                className="w-full bg-black/30 border border-white/5 rounded-md px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#667eea]/50"
                placeholder="400"
              />
            </div>
          )}

          {/* Pagination Options (for paginate) */}
          {funcType === 'paginate' && (
            <div className="glass-card space-y-3">
              <label className="block text-sm text-gray-400">Pagination Options</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Page</label>
                  <input
                    type="number"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    className="w-full bg-black/30 border border-white/5 rounded-md px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#667eea]/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Per Page</label>
                  <input
                    type="number"
                    value={perPage}
                    onChange={(e) => setPerPage(e.target.value)}
                    className="w-full bg-black/30 border border-white/5 rounded-md px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#667eea]/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Total</label>
                  <input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="w-full bg-black/30 border border-white/5 rounded-md px-3 py-2 font-mono text-sm text-gray-300 focus:outline-none focus:border-[#667eea]/50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Output</h3>
          <CopyButton code={responseOutput}>
            <div className="glass-card h-full min-h-[400px]">
              <div className="bg-black/30 border border-white/5 rounded-md h-full min-h-[400px] overflow-x-auto">
                <pre className="p-4 text-sm font-mono text-gray-300">
                  {responseOutput}
                </pre>
              </div>
            </div>
          </CopyButton>
        </div>
      </div>

      {/* Note */}
      <div className="mt-8 glass-card text-center py-4">
        <span className="text-gray-400 text-sm">
          This is how your API responses will look! Try different inputs and see the result in real-time. 🎮
        </span>
      </div>
    </section>
  )
}

'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="max-w-md px-6 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">Something went wrong!</h2>
        <p className="mb-6 text-gray-400">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md bg-gray-800 px-4 py-2 text-gray-100 transition-colors hover:bg-gray-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

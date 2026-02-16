import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="max-w-md px-6 text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-100">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-100">Page not found</h2>
        <p className="mb-6 text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-gray-800 px-4 py-2 text-gray-100 transition-colors hover:bg-gray-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

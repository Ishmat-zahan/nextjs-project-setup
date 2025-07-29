'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page
    router.push('/home')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Mental Health App</h1>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}

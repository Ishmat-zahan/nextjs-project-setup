'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to Your Mental Health Journey
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Your companion for mental wellness and personal growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Mood Checker</h2>
          <p className="text-gray-600 mb-4">
            Track your mood and get personalized insights.
          </p>
          <Link
            href="/mood"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Check Mood
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">AI Chatbot</h2>
          <p className="text-gray-600 mb-4">
            Get support and guidance from our AI companion.
          </p>
          <Link
            href="/chatbot"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Chat Now
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Community</h2>
          <p className="text-gray-600 mb-4">
            Connect with others and share your journey.
          </p>
          <Link
            href="/community"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Join Community
          </Link>
        </div>
      </div>
    </section>
  )
}

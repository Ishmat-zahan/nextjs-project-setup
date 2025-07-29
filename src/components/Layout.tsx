'use client'

import { useEffect } from 'react'
import { useHourlyWishes } from '../hooks/useHourlyWishes'

export default function Layout({ children }: { children: React.ReactNode }) {
  useHourlyWishes()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {children}
      <footer className="mt-auto py-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Mental Health App. Your wellness journey matters.</p>
            <p className="mt-1">Take care of your mental health every day.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

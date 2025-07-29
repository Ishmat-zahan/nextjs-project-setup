'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const moodSchema = z.object({
  mood: z.enum(['very-happy', 'happy', 'neutral', 'sad', 'very-sad']),
  notes: z.string().optional(),
})

type MoodFormData = z.infer<typeof moodSchema>

const moodOptions = [
  { value: 'very-happy', label: 'Very Happy', color: 'bg-green-500', emoji: '😊' },
  { value: 'happy', label: 'Happy', color: 'bg-green-400', emoji: '🙂' },
  { value: 'neutral', label: 'Neutral', color: 'bg-yellow-400', emoji: '😐' },
  { value: 'sad', label: 'Sad', color: 'bg-orange-400', emoji: '😔' },
  { value: 'very-sad', label: 'Very Sad', color: 'bg-red-500', emoji: '😢' },
]

export default function MoodCheckerPage() {
  const [submitted, setSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MoodFormData>({
    resolver: zodResolver(moodSchema),
  })

  const onSubmit = async (data: MoodFormData) => {
    console.log('Mood data:', data)
    setSubmitted(true)
    
    // Store mood data (in real app, send to API)
    localStorage.setItem('lastMood', JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
    }))
    
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          How are you feeling today?
        </h1>
        <p className="text-lg text-gray-600">
          Take a moment to check in with yourself and track your emotional state.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Select your current mood:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {moodOptions.map((option) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    {...register('mood')}
                    type="radio"
                    value={option.value}
                    className="sr-only"
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-50">
                    <div className="text-center">
                      <div className={`w-12 h-12 ${option.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white text-2xl`}>
                        {option.emoji}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{option.label}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.mood && (
              <p className="mt-2 text-sm text-red-600">{errors.mood.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional notes (optional)
            </label>
            <textarea
              {...register('notes')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="How are you feeling? What's on your mind?"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Mood
            </button>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-800">
                Mood saved successfully! Thank you for checking in with yourself.
              </p>
            </div>
          )}
        </form>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your Mood History</h3>
          <div className="text-center text-gray-500">
            <p>No mood entries yet. Start tracking your mood to see your progress!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

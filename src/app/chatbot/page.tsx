'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to support you on your mental health journey. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset } = useForm<{ message: string }>()

  const onSubmit = async (data: { message: string }) => {
    if (!data.message.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: data.message,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    reset()
    setIsLoading(true)

    try {
      // Call AI API - replace with actual API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: data.message,
          context: 'mental health support',
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const botMessage: Message = {
          id: Date.now() + 1,
          text: result.message,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error('Failed to get response')
      }
    } catch (error) {
      // Fallback response when API is not available
      const fallbackResponses = [
        "I understand you're going through something difficult. Remember that it's okay to feel this way, and you're not alone.",
        "Thank you for sharing that with me. Your feelings are valid, and it takes courage to express them.",
        "It sounds like you're dealing with a lot right now. Have you considered talking to a mental health professional?",
        "I hear you. Sometimes just talking about our feelings can help us process them better.",
        "That must be challenging for you. What usually helps you feel better when you're going through tough times?",
      ]
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Mental Health Companion</h1>
        <p className="text-lg text-gray-600">
          Chat with our AI companion for support and guidance on your mental health journey.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <p className="text-sm">Typing...</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
            <input
              {...register('message', { required: true })}
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          This AI companion is for support purposes only and is not a replacement for professional mental health care.
          If you're experiencing a mental health crisis, please contact a mental health professional or emergency services.
        </p>
      </div>
    </section>
  )
}

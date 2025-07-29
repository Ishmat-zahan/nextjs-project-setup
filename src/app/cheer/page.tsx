'use client'

import { useState } from 'react'

const cheerUpMessages = [
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "You are capable of amazing things.",
  "Believe you can and you're halfway there.",
  "Every day may not be good, but there is something good in every day.",
  "You are stronger than you think.",
  "Don't forget to smile today!",
  "Your potential is endless.",
  "Stay positive, work hard, make it happen.",
  "You are enough just as you are.",
  "Take it one day at a time.",
]

export default function CheerPage() {
  const [message, setMessage] = useState(
    cheerUpMessages[Math.floor(Math.random() * cheerUpMessages.length)]
  )

  const handleNewMessage = () => {
    let newMessage
    do {
      newMessage = cheerUpMessages[Math.floor(Math.random() * cheerUpMessages.length)]
    } while (newMessage === message)
    setMessage(newMessage)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Random Cheer Up Text</h1>
      <p className="text-xl text-gray-700 mb-8">{message}</p>
      <button
        onClick={handleNewMessage}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Cheer Me Up Again
      </button>
    </section>
  )
}

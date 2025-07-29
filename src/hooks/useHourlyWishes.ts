'use client'

import { useEffect } from 'react'

const wellWishingMessages = [
  "Remember, you are stronger than you think. Take a deep breath and keep going.",
  "Your mental health matters. Take a moment to appreciate how far you've come.",
  "It's okay to not be okay sometimes. You're doing your best, and that's enough.",
  "You are worthy of love, happiness, and peace. Treat yourself with kindness today.",
  "Every small step forward is progress. Be proud of yourself for trying.",
  "Your feelings are valid. It's okay to take time to process and heal.",
  "You have overcome challenges before, and you can do it again. Believe in yourself.",
  "Take a moment to breathe deeply. You are safe, you are valued, and you matter.",
  "Progress isn't always linear. Be patient with yourself on this journey.",
  "You deserve compassion, especially from yourself. Practice self-care today.",
  "Your story isn't over yet. There are beautiful chapters still to be written.",
  "It's brave to ask for help when you need it. You don't have to face this alone.",
]

export function useHourlyWishes() {
  useEffect(() => {
    // Function to show notification
    const showWellWishingMessage = () => {
      const randomMessage = wellWishingMessages[Math.floor(Math.random() * wellWishingMessages.length)]
      
      // Check if notifications are supported
      if ('Notification' in window) {
        // Request permission if not already granted
        if (Notification.permission === 'default') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('Mental Health Reminder', {
                body: randomMessage,
                icon: '/favicon.ico',
                tag: 'mental-health-reminder'
              })
            }
          })
        } else if (Notification.permission === 'granted') {
          new Notification('Mental Health Reminder', {
            body: randomMessage,
            icon: '/favicon.ico',
            tag: 'mental-health-reminder'
          })
        }
      }
      
      // Also show as a toast/alert for browsers that don't support notifications
      // or when notifications are denied
      if (typeof window !== 'undefined') {
        // Create a simple toast notification
        const toast = document.createElement('div')
        toast.className = 'fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm'
        toast.innerHTML = `
          <div class="flex items-start">
            <div class="flex-1">
              <h4 class="font-medium">Mental Health Reminder</h4>
              <p class="text-sm mt-1">${randomMessage}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
              ×
            </button>
          </div>
        `
        document.body.appendChild(toast)
        
        // Auto remove after 10 seconds
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove()
          }
        }, 10000)
      }
    }

    // Show initial message after 5 seconds
    const initialTimeout = setTimeout(showWellWishingMessage, 5000)
    
    // Set up hourly interval (3600000 ms = 1 hour)
    const hourlyInterval = setInterval(showWellWishingMessage, 3600000)

    // Cleanup function
    return () => {
      clearTimeout(initialTimeout)
      clearInterval(hourlyInterval)
    }
  }, [])
}

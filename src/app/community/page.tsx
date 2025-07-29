'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const communitySchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
})

type CommunityFormData = z.infer<typeof communitySchema>

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Welcome to the community!',
      content: 'This is a safe space to share your thoughts and connect with others on your mental health journey.',
      author: 'Admin',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Daily Gratitude Practice',
      content: 'I started writing down three things I am grateful for each day. It has really helped shift my perspective.',
      author: 'Sarah',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
  ])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommunityFormData>({
    resolver: zodResolver(communitySchema),
  })

  const onSubmit = async (data: CommunityFormData) => {
    const newPost = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      author: 'You',
      timestamp: new Date().toISOString(),
    }
    setPosts([newPost, ...posts])
    reset()
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Community</h1>
        <p className="text-lg text-gray-600">
          Connect with others and share your mental health journey in a supportive environment.
        </p>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Share Your Thoughts</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's on your mind?"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              {...register('content')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your thoughts, experiences, or ask for support..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Share Post
          </button>
        </form>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Community Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      // Return fallback response when API key is not configured
      const fallbackResponses = [
        "I understand you're going through something difficult. Remember that it's okay to feel this way, and you're not alone.",
        "Thank you for sharing that with me. Your feelings are valid, and it takes courage to express them.",
        "It sounds like you're dealing with a lot right now. Have you considered talking to a mental health professional?",
        "I hear you. Sometimes just talking about our feelings can help us process them better.",
        "That must be challenging for you. What usually helps you feel better when you're going through tough times?",
        "Your mental health matters. Remember to be kind to yourself and take things one day at a time.",
        "It's brave of you to reach out and talk about how you're feeling. That's an important step.",
        "Everyone's mental health journey is different. What works for others might not work for you, and that's okay.",
      ]
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      
      return NextResponse.json({ 
        message: randomResponse,
        note: 'This is a fallback response. Configure OPENROUTER_API_KEY for AI-powered responses.'
      })
    }

    // Call OpenRouter API for AI response
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000',
        'X-Title': 'Mental Health App',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-sonnet',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate mental health support AI companion. Your role is to:
            - Provide emotional support and validation
            - Offer coping strategies and mindfulness techniques
            - Encourage professional help when appropriate
            - Be empathetic, non-judgmental, and supportive
            - Keep responses concise but meaningful
            - Never provide medical diagnoses or replace professional therapy
            - Always prioritize user safety and well-being
            
            If someone expresses thoughts of self-harm or suicide, encourage them to seek immediate professional help or contact emergency services.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to get AI response')
    }

    const data = await response.json()
    const aiMessage = data.choices[0]?.message?.content || "I'm here to listen and support you."

    return NextResponse.json({ message: aiMessage })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Return fallback response on error
    const fallbackResponses = [
      "I'm here to listen and support you through whatever you're going through.",
      "Your feelings are important and valid. Thank you for sharing with me.",
      "It takes strength to reach out. I'm glad you're taking care of your mental health.",
      "Remember that seeking help is a sign of strength, not weakness.",
    ]
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
    
    return NextResponse.json({ 
      message: randomResponse,
      note: 'Fallback response due to API error.'
    })
  }
}

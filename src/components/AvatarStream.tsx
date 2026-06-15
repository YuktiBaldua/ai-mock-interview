'use client'

import { useEffect, useRef, useState } from 'react'
import { akoolAPI } from '@/lib/akool'

interface AvatarStreamProps {
  sessionId?: string
  onSessionReady?: (sessionId: string) => void
  onError?: (error: string) => void
}

export default function AvatarStream({ sessionId, onSessionReady, onError }: AvatarStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [streamUrl, setStreamUrl] = useState<string>('')
  const [currentSessionId, setCurrentSessionId] = useState<string>(sessionId || '')

  useEffect(() => {
    if (!currentSessionId) {
      initializeAvatarSession()
    } else {
      connectToStream()
    }
  }, [currentSessionId])

  const initializeAvatarSession = async () => {
    try {
      setIsLoading(true)
      
      // Create new avatar session
      const response = await akoolAPI.createAvatarSession({
        avatarId: 'default-interviewer', // This would be configurable
        voiceId: 'professional-female',
        quality: 'high',
        background: 'office'
      })

      setCurrentSessionId(response.sessionId)
      setStreamUrl(response.streamUrl)
      
      if (onSessionReady) {
        onSessionReady(response.sessionId)
      }

      // Wait for session to be ready
      await waitForSessionReady(response.sessionId)
      
    } catch (error) {
      console.error('Failed to initialize avatar session:', error)
      if (onError) {
        onError('Failed to initialize avatar session')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const waitForSessionReady = async (sessionId: string, maxAttempts = 30) => {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const status = await akoolAPI.getSessionStatus(sessionId)
        
        if (status.status === 'ready') {
          if (status.streamUrl) {
            setStreamUrl(status.streamUrl)
          }
          return
        }
        
        if (status.status === 'error') {
          throw new Error('Avatar session failed to initialize')
        }
        
        // Wait 1 second before checking again
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error('Error checking session status:', error)
        throw error
      }
    }
    
    throw new Error('Avatar session timeout')
  }

  const connectToStream = async () => {
    if (!streamUrl && currentSessionId) {
      try {
        const status = await akoolAPI.getSessionStatus(currentSessionId)
        if (status.streamUrl) {
          setStreamUrl(status.streamUrl)
        }
      } catch (error) {
        console.error('Error getting stream URL:', error)
      }
    }
  }

  useEffect(() => {
    if (streamUrl && videoRef.current) {
      // Set up video stream
      videoRef.current.src = streamUrl
      videoRef.current.load()
    }
  }, [streamUrl])

  const sendMessage = async (text: string, emotion: 'neutral' | 'happy' | 'serious' | 'friendly' = 'neutral') => {
    if (!currentSessionId) {
      console.error('No active avatar session')
      return
    }

    try {
      await akoolAPI.sendMessage({
        sessionId: currentSessionId,
        text,
        emotion
      })
    } catch (error) {
      console.error('Error sending message to avatar:', error)
      if (onError) {
        onError('Failed to send message to avatar')
      }
    }
  }

  // Expose sendMessage function to parent component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).avatarSendMessage = sendMessage
    }
  }, [currentSessionId])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 rounded-full">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Initializing Avatar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {streamUrl ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={false}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            console.error('Video stream error:', e)
            if (onError) {
              onError('Video stream error')
            }
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <div className="text-6xl">👩‍💼</div>
        </div>
      )}
      
      {/* Fallback avatar if stream fails */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-0 hover:opacity-100 transition-opacity">
        <div className="text-6xl">👩‍💼</div>
      </div>
    </div>
  )
}

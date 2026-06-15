'use client'

import { useState, useEffect, useRef } from 'react'
import { SignedIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  MessageSquare,
  Clock,
  ArrowRight,
  Volume2
} from 'lucide-react'

export default function InterviewSession() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false)
  const [userResponse, setUserResponse] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const questions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this role?",
    "Describe a challenging project you've worked on.",
    "How do you handle working under pressure?",
    "Where do you see yourself in 5 years?"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Initialize user camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(err => console.error('Error accessing camera:', err))
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setUserResponse('')
      setIsAvatarSpeaking(true)
      setTimeout(() => setIsAvatarSpeaking(false), 3000)
    } else {
      router.push('/interview/complete')
    }
  }

  const handleEndInterview = () => {
    if (confirm('Are you sure you want to end the interview?')) {
      router.push('/interview/complete')
    }
  }

  return (
    <SignedIn>
      <div className="min-h-screen interview-container">
        {/* Header */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/20">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-white">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
            </div>
            
            <div className="text-white text-center">
              <div className="text-sm opacity-80">Question {currentQuestion + 1} of {questions.length}</div>
              <div className="font-semibold">Software Engineer Interview</div>
            </div>

            <button
              onClick={handleEndInterview}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              End Interview
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)]">
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* AI Avatar Section */}
            <div className="flex flex-col">
              <div className="avatar-container rounded-2xl p-8 flex-1 flex flex-col justify-center items-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-6 relative">
                  {/* Placeholder for Akool Avatar */}
                  <div className="w-56 h-56 bg-black rounded-full flex items-center justify-center overflow-hidden">
  <video src="/avatar-loop.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
</div>
                  
                  {/* Speaking indicator */}
                  {isAvatarSpeaking && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">Sarah Chen</h3>
                  <p className="text-white/80">Senior Engineering Manager</p>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex justify-center mt-4">
                <button className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors">
                  <Volume2 className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Interview Panel */}
            <div className="flex flex-col space-y-6">
              {/* Current Question */}
              <div className="question-card rounded-2xl p-6 shadow-xl">
                <div className="flex items-start space-x-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Current Question</h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {questions[currentQuestion]}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
                  >
                    <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* User Video */}
              <div className="bg-white/95 rounded-2xl p-4 shadow-xl">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  
                  {!isVideoOn && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <VideoOff className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full recording-indicator"></div>
                      <span className="text-white text-sm font-medium">Recording</span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-3 rounded-full transition-colors ${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {isRecording ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                  </button>

                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-full transition-colors ${
                      isVideoOn 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                  </button>

                  <button
                    onClick={handleEndInterview}
                    className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    <Phone className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-white/95 rounded-2xl p-4 shadow-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{currentQuestion + 1}/{questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  )
}

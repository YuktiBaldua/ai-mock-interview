'use client'

import { useState, useEffect, useRef } from 'react'
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
  Volume2,
  VolumeX,
  Keyboard,
  Play,
  Pause
} from 'lucide-react'

export default function InterviewSession() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false)
  const [userResponse, setUserResponse] = useState('') // Controlled input variable for typed answers
  const userVideoRef = useRef<HTMLVideoElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [isAvatarPlaying, setIsAvatarPlaying] = useState(false)
  const [isAvatarMuted, setIsAvatarMuted] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  const questions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this role?",
    "Describe a challenging project you've worked on.",
    "How do you handle working under pressure?",
    "Where do you see yourself in 5 years?"
  ]

  const speakQuestion = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Pick a professional sounding voice if available
      const voices = window.speechSynthesis.getVoices()
      const voice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural'))) 
        || voices.find(v => v.lang.includes('en'))
      
      if (voice) {
        utterance.voice = voice
      }

      utterance.onstart = () => {
        setIsAvatarSpeaking(true)
      }
      utterance.onend = () => {
        setIsAvatarSpeaking(false)
      }
      utterance.onerror = () => {
        setIsAvatarSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-speak the question when currentQuestion changes
  useEffect(() => {
    speakQuestion(questions[currentQuestion])
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [currentQuestion])

  // Speech Recognition (Speech-to-Text) Initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const rec = new SpeechRecognition()
        rec.continuous = true
        rec.interimResults = false
        rec.lang = 'en-US'

        rec.onresult = (event: any) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript + ' '
            }
          }
          if (transcript) {
            setUserResponse(prev => prev + transcript)
          }
        }

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
        }

        recognitionRef.current = rec
      }
    }
  }, [])

  // Control speech recognition starting and stopping based on isRecording state
  useEffect(() => {
    if (recognitionRef.current) {
      if (isRecording) {
        try {
          recognitionRef.current.start()
        } catch (e) {
          console.error("Failed to start speech recognition:", e)
        }
      } else {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          console.error("Failed to stop speech recognition:", e)
        }
      }
    }
  }, [isRecording])

  useEffect(() => {
    // Initialize user camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          setCameraError(null)
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream
          }
        })
        .catch(err => {
          console.warn('Error accessing camera and audio, trying camera only:', err)
          // Fallback to video only
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              setCameraError(null)
              if (userVideoRef.current) {
                userVideoRef.current.srcObject = stream
              }
            })
            .catch(fallbackErr => {
              console.error('Error accessing camera:', fallbackErr)
              setCameraError('Permission Denied')
            })
        })
    } else {
      setCameraError('Not Supported')
    }
  }, [])

  // Sync avatar video element state with React state on mount / load
  useEffect(() => {
    if (videoRef.current) {
      setIsAvatarMuted(videoRef.current.muted)
      setIsAvatarPlaying(!videoRef.current.paused)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Explicitly unmute and set full volume to bypass browser audio block
        videoRef.current.muted = false
        videoRef.current.volume = 1.0
        setIsAvatarMuted(false)
        videoRef.current.play()
          .then(() => setIsAvatarPlaying(true))
          .catch(err => console.error("Play failed:", err))
        
        // Also trigger the TTS speech
        speakQuestion(questions[currentQuestion])
      } else {
        videoRef.current.pause()
        setIsAvatarPlaying(false)
        if (typeof window !== 'undefined') {
          window.speechSynthesis.cancel()
        }
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsAvatarMuted(videoRef.current.muted)
      if (!videoRef.current.muted) {
        videoRef.current.volume = 1.0
        speakQuestion(questions[currentQuestion])
      } else {
        if (typeof window !== 'undefined') {
          window.speechSynthesis.cancel()
        }
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setUserResponse('') // Clears the text box automatically for the next question
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
                  <video 
                    ref={videoRef} 
                    src="/avatar-loop.mp4" 
                    autoPlay 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover object-top" 
                    onPlay={() => setIsAvatarPlaying(true)}
                    onPause={() => setIsAvatarPlaying(false)}
                  />
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
            <div className="flex justify-center space-x-4 mt-4">
              <button 
                onClick={togglePlay}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                title={isAvatarPlaying ? "Pause Avatar" : "Play Avatar"}
              >
                {isAvatarPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button 
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                title={isAvatarMuted ? "Unmute Avatar" : "Mute Avatar"}
              >
                {isAvatarMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Interview Panel */}
          <div className="flex flex-col space-y-6 overflow-y-auto pr-1">
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
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2"
                >
                  <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* NEW: Interactive Answer Typing Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-2 mb-3 border-b pb-2">
                <Keyboard className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Type Your Response</h3>
              </div>
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Structure your text reply here or use it alongside your microphone feedback..."
                className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-sm outline-none resize-none transition-all shadow-inner bg-gray-50/50"
              />
            </div>

            {/* User Video Container */}
            <div className="bg-white/95 rounded-2xl p-4 shadow-xl">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                
                {cameraError && (
                  <div className="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center p-6 text-center z-10">
                    <VideoOff className="h-12 w-12 text-red-500 mb-3" />
                    <span className="text-white text-base font-semibold mb-2">Camera Access Blocked</span>
                    <p className="text-gray-400 text-sm max-w-sm">
                      Please check the address bar or browser settings to allow camera access, then reload the page.
                    </p>
                  </div>
                )}
                
                {!isVideoOn && !cameraError && (
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

            {/* Progress Container */}
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
  )
}
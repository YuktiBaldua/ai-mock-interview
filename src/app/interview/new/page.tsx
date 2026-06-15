'use client'

import { useState } from 'react'
import { SignedIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Play, Settings2, Upload, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'

const jobRoles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'Business Analyst',
  'DevOps Engineer',
  'Custom Role'
]

const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior Level (6-10 years)' },
  { value: 'lead', label: 'Lead/Principal (10+ years)' }
]

const interviewTypes = [
  { value: 'behavioral', label: 'Behavioral Interview', description: 'Focus on past experiences and soft skills' },
  { value: 'technical', label: 'Technical Interview', description: 'Technical questions and problem solving' },
  { value: 'case', label: 'Case Study', description: 'Business case analysis and strategic thinking' },
  { value: 'mixed', label: 'Mixed Interview', description: 'Combination of behavioral and technical' }
]

export default function NewInterview() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState('')
  const [customRole, setCustomRole] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [interviewType, setInterviewType] = useState('')
  const [duration, setDuration] = useState('30')
  const [isLoading, setIsLoading] = useState(false)

  // Simulated Resume Upload States
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [fileName, setFileName] = useState('')

  const handleFakeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
      setUploadState('loading')
      
      // Simulates 1.8 seconds of processing time on the frontend
      setTimeout(() => {
        setUploadState('success')
      }, 1800)
    }
  }

  const handleStartInterview = async () => {
    if (!selectedRole || !experienceLevel || !interviewType) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    
    // Create interview session
    const interviewData = {
      role: selectedRole === 'Custom Role' ? customRole : selectedRole,
      experienceLevel,
      interviewType,
      duration: parseInt(duration),
      resumeUploaded: uploadState === 'success' ? fileName : 'None',
      createdAt: new Date().toISOString()
    }

    console.log('Starting interview with:', interviewData)
    
    setTimeout(() => {
      router.push('/interview/session')
    }, 1000)
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/dashboard" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Interview</h1>
            <p className="text-gray-600">Configure your mock interview session</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              
              {/* Job Role Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Job Role <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {jobRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedRole === role
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                
                {selectedRole === 'Custom Role' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter your custom role"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {/* Simulated Resume Upload Section */}
              <div className="border-t pt-6">
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Tailor with Your Resume <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                </label>
                <p className="text-sm text-gray-500 mb-4">Upload your profile details to dynamically align the simulated question sets.</p>
                
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors bg-gray-50/50 relative">
                  {uploadState === 'idle' && (
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                      <Upload className="w-8 h-8 text-blue-500 animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">Click to upload resume (PDF, DOCX)</span>
                      <span className="text-xs text-gray-400">MockMate AI parses text context automatically</span>
                      <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFakeUpload} />
                    </label>
                  )}

                  {uploadState === 'loading' && (
                    <div className="flex flex-col items-center justify-center gap-3 py-2">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                      <span className="text-sm font-medium text-blue-600 animate-pulse">MockMate AI engine extracting structural contexts...</span>
                    </div>
                  )}

                  {uploadState === 'success' && (
                    <div className="flex flex-col items-center justify-center gap-2 py-2 text-green-600">
                      <CheckCircle2 className="w-9 h-9 text-green-500" />
                      <span className="text-sm font-semibold text-green-700">"{fileName}" Extracted Perfectly!</span>
                      <span className="text-xs bg-green-50 px-3 py-1 rounded-full text-green-600 border border-green-200 font-medium">
                        Mapped Core Competencies & Core Framework Tracks
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Experience Level */}
              <div className="border-t pt-6">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setExperienceLevel(level.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        experienceLevel === level.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interview Type */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Interview Type <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {interviewTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setInterviewType(type.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        interviewType === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Interview Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              {/* Advanced Settings */}
              <div className="border-t pt-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Settings2 className="h-5 w-5" />
                  <span>Advanced Settings</span>
                </button>
              </div>

              {/* Start Button */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={handleStartInterview}
                  disabled={isLoading || !selectedRole || !experienceLevel || !interviewType}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Setting up...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span>Start Interview</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import { CheckCircle, BarChart3, Download, Share2, ArrowRight, Star } from 'lucide-react'

export default function InterviewComplete() {
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate score calculation and feedback generation
    setTimeout(() => {
      setScore(85)
      setFeedback('Great job! You demonstrated strong technical knowledge and communication skills.')
      setIsLoading(false)
    }, 2000)
  }, [])

  const strengths = [
    'Clear and concise communication',
    'Strong technical knowledge',
    'Good problem-solving approach',
    'Professional demeanor'
  ]

  const improvements = [
    'Provide more specific examples',
    'Ask clarifying questions',
    'Show more enthusiasm'
  ]

  if (isLoading) {
    return (
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing Your Performance</h2>
            <p className="text-gray-600">Please wait while we process your interview...</p>
          </div>
        </div>
      </SignedIn>
    )
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Complete!</h1>
            <p className="text-gray-600">Congratulations on completing your mock interview</p>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <span className="text-4xl font-bold text-white">{score}%</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Overall Score</h2>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.floor(score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{feedback}</p>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Strengths */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2" />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">92%</div>
                <div className="text-sm text-gray-600">Communication</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">88%</div>
                <div className="text-sm text-gray-600">Technical Skills</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">80%</div>
                <div className="text-sm text-gray-600">Problem Solving</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">78%</div>
                <div className="text-sm text-gray-600">Confidence</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Download Report</span>
            </button>
            
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Share Results</span>
            </button>
            
            <Link href="/interview/new">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center space-x-2">
                <span>Practice Again</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            
            <Link href="/dashboard">
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </SignedIn>
  )
}

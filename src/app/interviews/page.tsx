'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Star, Play, BarChart3 } from 'lucide-react'

export default function InterviewHistory() {
  const interviews = [
    {
      id: '1',
      jobRole: 'Software Engineer',
      company: 'Tech Corp',
      date: '2024-01-20',
      duration: '45 min',
      score: 85,
      status: 'completed',
      type: 'Technical'
    },
    {
      id: '2',
      jobRole: 'Product Manager',
      company: 'StartupXYZ',
      date: '2024-01-19',
      duration: '30 min',
      score: 78,
      status: 'completed',
      type: 'Behavioral'
    },
    {
      id: '3',
      jobRole: 'Data Scientist',
      company: 'AI Solutions',
      date: '2024-01-18',
      duration: '60 min',
      score: 92,
      status: 'completed',
      type: 'Mixed'
    },
    {
      id: '4',
      jobRole: 'UX Designer',
      company: 'Design Studio',
      date: '2024-01-17',
      duration: '40 min',
      score: 88,
      status: 'completed',
      type: 'Case Study'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 80) return 'text-blue-600 bg-blue-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical': return 'bg-purple-100 text-purple-800'
      case 'Behavioral': return 'bg-green-100 text-green-800'
      case 'Mixed': return 'bg-blue-100 text-blue-800'
      case 'Case Study': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Interview History</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/interview/new">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>New Interview</span>
                </button>
              </Link>
              <UserButton />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">{interviews.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round(interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length)}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Best Score</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.max(...interviews.map(i => i.score))}%
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Interview List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {interviews.map((interview) => (
                <div key={interview.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {interview.jobRole}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(interview.type)}`}>
                          {interview.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{interview.company}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{interview.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(interview.score)}`}>
                          {interview.score}%
                        </div>
                      </div>
                      
                      <Link href={`/interview/${interview.id}/review`}>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                2
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  )
}

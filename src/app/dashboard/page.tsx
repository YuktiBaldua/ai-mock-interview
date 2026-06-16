'use client'

import Link from 'next/link'
import { Video, Plus, Clock, BarChart3, Settings } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Interview</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/settings">
              <Settings className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            </Link>
            {/* Styled user badge layout placeholder matching original UserButton spacing */}
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm select-none">
              Y
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Ready to practice your interview skills?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/interview/new">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Start New Interview</h3>
                  <p className="text-gray-600">Begin a fresh mock interview session</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/interviews">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Past Interviews</h3>
                  <p className="text-gray-600">Review your previous sessions</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/analytics">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-200">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Analytics</h3>
                  <p className="text-gray-600">Track your progress and insights</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Software Engineer Interview</h4>
                <p className="text-sm text-gray-600">Completed 2 hours ago</p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  Score: 85%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Product Manager Interview</h4>
                <p className="text-sm text-gray-600">Completed yesterday</p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  Score: 78%
                </span>
              </div>
            </div>

            <div className="text-center py-4">
              <Link href="/interviews" className="text-blue-600 hover:text-blue-700 font-medium">
                View All Interviews →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Calendar, Target, Award } from 'lucide-react'

export default function Analytics() {
  const performanceData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 72 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 88 },
  ]

  const skillBreakdown = [
    { skill: 'Communication', score: 92, improvement: '+8%' },
    { skill: 'Technical Skills', score: 88, improvement: '+12%' },
    { skill: 'Problem Solving', score: 80, improvement: '+5%' },
    { skill: 'Leadership', score: 75, improvement: '+15%' },
  ]

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
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            </div>
            <UserButton />
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+4 this month</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">82%</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+12% improvement</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Best Score</p>
                  <p className="text-3xl font-bold text-gray-900">95%</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Software Engineer</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                  <p className="text-3xl font-bold text-gray-900">+23%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">Last 3 months</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Trend</h3>
            <div className="h-64 flex items-end space-x-4">
              {performanceData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-blue-500 rounded-t w-full transition-all duration-500"
                    style={{ height: `${(data.score / 100) * 200}px` }}
                  ></div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{data.score}%</p>
                    <p className="text-xs text-gray-600">{data.month}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Skill Breakdown</h3>
              <div className="space-y-4">
                {skillBreakdown.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">{skill.score}%</span>
                        <span className="text-xs text-green-600">{skill.improvement}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Perfect Score!</p>
                    <p className="text-sm text-gray-600">Scored 100% in behavioral interview</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Improvement Streak</p>
                    <p className="text-sm text-gray-600">5 consecutive interviews with higher scores</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Goal Achieved</p>
                    <p className="text-sm text-gray-600">Reached 80% average score target</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  )
}

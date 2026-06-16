'use client'

import Link from 'next/link'
import { ArrowRight, Video, Brain, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Interview</h1>
          </div>
          <div>
            <Link href="/dashboard">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Open Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            MOCKMATE 
            <span className="text-blue-600"> - AI Interview Prep</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience realistic mock interviews with AI-powered streaming avatars. 
            Get instant feedback, improve your skills, and land your dream job.
          </p>
          
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Start Your First Interview</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg">
            <Video className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Streaming Avatars</h3>
            <p className="text-gray-600">Realistic AI avatars powered by Akool</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Questions</h3>
            <p className="text-gray-600">Dynamic role-based question profiles</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Enterprise-grade network edge protection</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white shadow-lg">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-gray-600">Instant metrics and custom performance tracking</p>
          </div>
        </div>
      </main>
    </div>
  )
}
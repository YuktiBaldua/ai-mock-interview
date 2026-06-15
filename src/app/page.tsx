import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
            <SignedOut>
              <SignInButton>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Practice Interviews with
            <span className="text-blue-600"> AI Avatars</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience realistic mock interviews with AI-powered streaming avatars. 
            Get instant feedback, improve your skills, and land your dream job.
          </p>
          
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2">
                <span>Start Your First Interview</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <Link href="/dashboard">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2">
                <span>Go to Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </SignedIn>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Streaming Avatars</h3>
            <p className="text-gray-600">Realistic AI avatars powered by Akool for immersive interview experience</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Questions</h3>
            <p className="text-gray-600">Dynamic question generation tailored to your role and experience level</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">Enterprise-grade security with ArcJet protection and Clerk authentication</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
            <p className="text-gray-600">Instant analysis and personalized recommendations to improve your performance</p>
          </div>
        </div>

        {/* Demo Video Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">See It In Action</h3>
          <div className="bg-gray-900 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Demo video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 AI Interview Platform. Built with Next.js, Convex, and Akool.</p>
        </div>
      </footer>
    </div>
  )
}

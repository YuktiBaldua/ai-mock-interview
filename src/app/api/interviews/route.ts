import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import aj from '@/lib/arcjet'

export async function POST(req: NextRequest) {
  try {
    // ArcJet protection
    const decision = await aj.protect(req, {
      userId: auth().userId || 'anonymous',
      requested: 1,
    })

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { jobRole, experienceLevel, interviewType, duration } = body

    // Validate required fields
    if (!jobRole || !experienceLevel || !interviewType || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create interview session
    const interviewData = {
      userId,
      jobRole,
      experienceLevel,
      interviewType,
      duration,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    }

    // In a real implementation, this would use Convex mutations
    console.log('Creating interview:', interviewData)

    return NextResponse.json({
      success: true,
      interviewId: 'mock-interview-id',
      message: 'Interview session created successfully'
    })

  } catch (error) {
    console.error('Error creating interview:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const decision = await aj.protect(req, {
      userId: auth().userId || 'anonymous',
      requested: 1,
    })

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Mock data for demonstration
    const interviews = [
      {
        id: '1',
        jobRole: 'Software Engineer',
        status: 'completed',
        score: 85,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        jobRole: 'Product Manager',
        status: 'completed',
        score: 78,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      }
    ]

    return NextResponse.json({ interviews })

  } catch (error) {
    console.error('Error fetching interviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

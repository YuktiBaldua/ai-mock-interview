import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { n8nWorkflow } from '@/lib/n8n'
import aj from '@/lib/arcjet'

export async function POST(req: NextRequest) {
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

    const body = await req.json()
    const { event, data } = body

    // Trigger appropriate n8n workflow based on event
    switch (event) {
      case 'interview.scheduled':
        await n8nWorkflow.onInterviewScheduled(data)
        break
      case 'interview.started':
        await n8nWorkflow.onInterviewStarted(data)
        break
      case 'interview.completed':
        await n8nWorkflow.onInterviewCompleted(data)
        break
      case 'interview.cancelled':
        await n8nWorkflow.onInterviewCancelled(data)
        break
      case 'user.registered':
        await n8nWorkflow.onUserRegistered(data)
        break
      case 'performance.low_score':
        await n8nWorkflow.onLowScore(data)
        break
      case 'performance.high_score':
        await n8nWorkflow.onHighScore(data)
        break
      default:
        return NextResponse.json(
          { error: 'Unknown event type' },
          { status: 400 }
        )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('n8n webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

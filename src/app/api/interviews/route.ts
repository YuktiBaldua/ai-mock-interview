import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { akoolAPI } from '@/lib/akool'
import aj from '@/lib/arcjet'

export async function POST(req: NextRequest) {
  try {
    const authObject = await auth()
    const userId = authObject?.userId

    const decision = await aj.protect(req, {
      userId: userId || 'anonymous',
      requested: 1,
    })

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { action, sessionId, text, emotion } = body

    if (action === 'create') {
      const session = await akoolAPI.createAvatarSession({
        avatarId: 'professional-interviewer',
        voiceId: 'female-professional',
        quality: 'high',
        background: 'office'
      })

      return NextResponse.json({
        success: true,
        sessionId: session.sessionId,
        streamUrl: session.streamUrl,
        status: session.status
      })
    }

    if (action === 'speak' && sessionId && text) {
      await akoolAPI.sendMessage({
        sessionId,
        text,
        emotion: emotion || 'neutral'
      })
      return NextResponse.json({ success: true })
    }

    if (action === 'status' && sessionId) {
      const status = await akoolAPI.getSessionStatus(sessionId)
      return NextResponse.json(status)
    }

    if (action === 'end' && sessionId) {
      await akoolAPI.endSession(sessionId)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Avatar API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
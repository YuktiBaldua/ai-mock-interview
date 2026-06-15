import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { akoolAPI } from '@/lib/akool'
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
    const { action, sessionId, text, emotion } = body

    if (action === 'create') {
      // Create new avatar session
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
      // Send message to avatar
      await akoolAPI.sendMessage({
        sessionId,
        text,
        emotion: emotion || 'neutral'
      })

      return NextResponse.json({ success: true })
    }

    if (action === 'status' && sessionId) {
      // Get session status
      const status = await akoolAPI.getSessionStatus(sessionId)
      return NextResponse.json(status)
    }

    if (action === 'end' && sessionId) {
      // End avatar session
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

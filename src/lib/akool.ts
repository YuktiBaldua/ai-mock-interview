interface AkoolConfig {
  apiKey: string;
  baseUrl: string;
}

interface CreateAvatarSessionRequest {
  avatarId: string;
  voiceId: string;
  quality: 'low' | 'medium' | 'high';
  background?: string;
}

interface AvatarSessionResponse {
  sessionId: string;
  streamUrl: string;
  status: 'initializing' | 'ready' | 'error';
}

interface SendMessageRequest {
  sessionId: string;
  text: string;
  emotion?: 'neutral' | 'happy' | 'serious' | 'friendly';
}

class AkoolAPI {
  private config: AkoolConfig;

  constructor(apiKey: string) {
    this.config = {
      apiKey,
      baseUrl: 'https://api.akool.com/v1'
    };
  }

  async createAvatarSession(request: CreateAvatarSessionRequest): Promise<AvatarSessionResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/avatar/session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avatar_id: request.avatarId,
          voice_id: request.voiceId,
          quality: request.quality,
          background: request.background || 'transparent',
        }),
      });

      if (!response.ok) {
        throw new Error(`Akool API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        sessionId: data.session_id,
        streamUrl: data.stream_url,
        status: data.status,
      };
    } catch (error) {
      console.error('Error creating Akool avatar session:', error);
      throw error;
    }
  }

  async sendMessage(request: SendMessageRequest): Promise<void> {
    try {
      const response = await fetch(`${this.config.baseUrl}/avatar/speak`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: request.sessionId,
          text: request.text,
          emotion: request.emotion || 'neutral',
        }),
      });

      if (!response.ok) {
        throw new Error(`Akool API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending message to Akool avatar:', error);
      throw error;
    }
  }

  async endSession(sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.config.baseUrl}/avatar/session/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Akool API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error ending Akool avatar session:', error);
      throw error;
    }
  }

  async getSessionStatus(sessionId: string): Promise<{ status: string; streamUrl?: string }> {
    try {
      const response = await fetch(`${this.config.baseUrl}/avatar/session/${sessionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Akool API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: data.status,
        streamUrl: data.stream_url,
      };
    } catch (error) {
      console.error('Error getting Akool session status:', error);
      throw error;
    }
  }
}

export const akoolAPI = new AkoolAPI(process.env.AKOOL_API_KEY || '');
export type { CreateAvatarSessionRequest, AvatarSessionResponse, SendMessageRequest };

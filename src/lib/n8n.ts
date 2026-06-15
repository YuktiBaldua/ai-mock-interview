interface N8nWebhookPayload {
  event: string;
  data: any;
  timestamp: string;
}

interface InterviewEventData {
  userId: string;
  interviewId: string;
  jobRole: string;
  status: string;
  score?: number;
  feedback?: string;
}

class N8nWorkflowManager {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async triggerWorkflow(event: string, data: any): Promise<void> {
    try {
      const payload: N8nWebhookPayload = {
        event,
        data,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook failed: ${response.status}`);
      }

      console.log(`n8n workflow triggered for event: ${event}`);
    } catch (error) {
      console.error('Error triggering n8n workflow:', error);
      // Don't throw - workflows are non-critical
    }
  }

  // Interview lifecycle events
  async onInterviewScheduled(data: InterviewEventData): Promise<void> {
    await this.triggerWorkflow('interview.scheduled', data);
  }

  async onInterviewStarted(data: InterviewEventData): Promise<void> {
    await this.triggerWorkflow('interview.started', data);
  }

  async onInterviewCompleted(data: InterviewEventData): Promise<void> {
    await this.triggerWorkflow('interview.completed', data);
  }

  async onInterviewCancelled(data: InterviewEventData): Promise<void> {
    await this.triggerWorkflow('interview.cancelled', data);
  }

  // User events
  async onUserRegistered(data: { userId: string; email: string; name: string }): Promise<void> {
    await this.triggerWorkflow('user.registered', data);
  }

  // Performance events
  async onLowScore(data: InterviewEventData & { score: number }): Promise<void> {
    if (data.score < 60) {
      await this.triggerWorkflow('performance.low_score', data);
    }
  }

  async onHighScore(data: InterviewEventData & { score: number }): Promise<void> {
    if (data.score >= 90) {
      await this.triggerWorkflow('performance.high_score', data);
    }
  }

  // Analytics events
  async onDailyReport(data: { date: string; totalInterviews: number; averageScore: number }): Promise<void> {
    await this.triggerWorkflow('analytics.daily_report', data);
  }
}

export const n8nWorkflow = new N8nWorkflowManager(process.env.N8N_WEBHOOK_URL || '');
export type { InterviewEventData };

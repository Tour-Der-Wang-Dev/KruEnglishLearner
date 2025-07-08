import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

export interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  duration: number;
  join_url: string;
  password?: string;
  host_id: string;
  status: string;
  type: number;
  recurrence?: {
    type: number;
    repeat_interval: number;
    weekly_days?: string;
    monthly_day?: number;
    end_times?: number;
  };
}

export interface CreateMeetingRequest {
  topic: string;
  type: number; // 1: Instant, 2: Scheduled, 3: Recurring no fixed time, 8: Recurring fixed time
  start_time?: string;
  duration?: number;
  timezone?: string;
  password?: string;
  recurrence?: {
    type: number; // 1: Daily, 2: Weekly, 3: Monthly
    repeat_interval: number;
    weekly_days?: string; // "1,2,3,4,5" for Mon-Fri
    monthly_day?: number;
    end_times?: number;
  };
  settings?: {
    host_video?: boolean;
    participant_video?: boolean;
    join_before_host?: boolean;
    mute_upon_entry?: boolean;
    watermark?: boolean;
    use_pmi?: boolean;
    approval_type?: number;
    audio?: string;
    auto_recording?: string;
    waiting_room?: boolean;
  };
}

export class ZoomService {
  private static instance: ZoomService;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  private constructor() {}

  static getInstance(): ZoomService {
    if (!ZoomService.instance) {
      ZoomService.instance = new ZoomService();
    }
    return ZoomService.instance;
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const accountId = process.env.ZOOM_ACCOUNT_ID;
    const clientId = process.env.ZOOM_API_KEY;
    const clientSecret = process.env.ZOOM_API_SECRET;

    if (!accountId || !clientId || !clientSecret) {
      throw new Error('Missing Zoom API credentials. Please set ZOOM_ACCOUNT_ID, ZOOM_API_KEY, and ZOOM_API_SECRET');
    }

    try {
      const response = await fetch('https://zoom.us/oauth/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=account_credentials&account_id=${accountId}`,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get Zoom access token: ${response.status} ${errorText}`);
      }

      const data = await response.json() as any;
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 minute early

      return this.accessToken;
    } catch (error) {
      console.error('Zoom authentication error:', error);
      throw new Error(`Zoom authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async createMeeting(meetingData: CreateMeetingRequest): Promise<ZoomMeeting> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: meetingData.topic,
          type: meetingData.type,
          start_time: meetingData.start_time,
          duration: meetingData.duration || 60,
          timezone: meetingData.timezone || 'Asia/Bangkok',
          password: meetingData.password,
          recurrence: meetingData.recurrence,
          settings: {
            host_video: true,
            participant_video: true,
            join_before_host: true,
            mute_upon_entry: true,
            watermark: false,
            use_pmi: false,
            approval_type: 0, // Automatically approve
            audio: 'both',
            auto_recording: 'none',
            waiting_room: false,
            ...meetingData.settings
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create Zoom meeting: ${response.status} ${errorText}`);
      }

      const meeting = await response.json() as ZoomMeeting;
      return meeting;
    } catch (error) {
      console.error('Create meeting error:', error);
      throw new Error(`Failed to create Zoom meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getMeeting(meetingId: string): Promise<ZoomMeeting> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get Zoom meeting: ${response.status} ${errorText}`);
      }

      const meeting = await response.json() as ZoomMeeting;
      return meeting;
    } catch (error) {
      console.error('Get meeting error:', error);
      throw new Error(`Failed to get Zoom meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateMeeting(meetingId: string, meetingData: Partial<CreateMeetingRequest>): Promise<void> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update Zoom meeting: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Update meeting error:', error);
      throw new Error(`Failed to update Zoom meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete Zoom meeting: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Delete meeting error:', error);
      throw new Error(`Failed to delete Zoom meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async listMeetings(): Promise<ZoomMeeting[]> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch('https://api.zoom.us/v2/users/me/meetings?type=live&page_size=300', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to list Zoom meetings: ${response.status} ${errorText}`);
      }

      const data = await response.json() as any;
      return data.meetings || [];
    } catch (error) {
      console.error('List meetings error:', error);
      throw new Error(`Failed to list Zoom meetings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Helper method to create recurring class meetings
  async createClassMeeting(courseName: string, schedule: string, duration: number = 60): Promise<ZoomMeeting> {
    // Parse schedule to determine recurrence pattern
    const isDaily = schedule.toLowerCase().includes('ทุกวัน') || schedule.toLowerCase().includes('daily');
    const isWeekly = schedule.toLowerCase().includes('จันทร์-ศุกร์') || schedule.toLowerCase().includes('mon-fri');
    
    let recurrence;
    if (isDaily) {
      recurrence = {
        type: 1, // Daily
        repeat_interval: 1,
        end_times: 30 // 30 occurrences
      };
    } else if (isWeekly) {
      recurrence = {
        type: 2, // Weekly
        repeat_interval: 1,
        weekly_days: "1,2,3,4,5", // Mon-Fri
        end_times: 12 // 12 weeks
      };
    }

    const meetingData: CreateMeetingRequest = {
      topic: `${courseName} - Kru English Class`,
      type: recurrence ? 8 : 2, // Recurring fixed time or scheduled
      duration,
      timezone: 'Asia/Bangkok',
      password: Math.random().toString(36).substring(2, 8).toUpperCase(),
      recurrence,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: true,
        waiting_room: false,
        approval_type: 0
      }
    };

    return await this.createMeeting(meetingData);
  }

  // Test Zoom API connection
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch('https://api.zoom.us/v2/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API test failed: ${response.status}`);
      }

      const userData = await response.json() as any;
      return {
        success: true,
        message: `Connected successfully as ${userData.email || userData.first_name || 'Zoom User'}`
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}
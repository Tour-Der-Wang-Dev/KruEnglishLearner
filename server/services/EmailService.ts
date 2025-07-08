// Email service following Single Responsibility Principle
export interface IEmailService {
  sendContactNotification(data: ContactData): Promise<boolean>;
  sendEnrollmentConfirmation(data: EnrollmentData): Promise<boolean>;
  sendLevelTestResults(data: LevelTestData): Promise<boolean>;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface EnrollmentData {
  userName: string;
  userEmail: string;
  courseName: string;
  planDuration: string;
  price: number;
  enrollmentId: number;
}

export interface LevelTestData {
  userName: string;
  userEmail: string;
  level: string;
  score: number;
  recommendations: string[];
}

// Mock implementation - replace with actual email service
export class MockEmailService implements IEmailService {
  async sendContactNotification(data: ContactData): Promise<boolean> {
    console.log('📧 Contact notification sent:', {
      to: 'admin@kruenglish.com',
      subject: `New Contact Form Submission from ${data.name}`,
      data
    });
    return true;
  }

  async sendEnrollmentConfirmation(data: EnrollmentData): Promise<boolean> {
    console.log('📧 Enrollment confirmation sent:', {
      to: data.userEmail,
      subject: `Welcome to ${data.courseName}!`,
      data
    });
    return true;
  }

  async sendLevelTestResults(data: LevelTestData): Promise<boolean> {
    console.log('📧 Level test results sent:', {
      to: data.userEmail,
      subject: `Your English Level Test Results: ${data.level}`,
      data
    });
    return true;
  }
}

// Factory for email service
export class EmailServiceFactory {
  private static instance: IEmailService;

  static getInstance(): IEmailService {
    if (!this.instance) {
      // Replace with actual email service implementation
      this.instance = new MockEmailService();
    }
    return this.instance;
  }
}
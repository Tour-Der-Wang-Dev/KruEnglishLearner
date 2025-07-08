import { ApiResponse, PaginatedResponse } from '@/types';

// Base API configuration
const API_BASE_URL = '/api';

// Generic API client following Single Responsibility Principle
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Service interfaces following Interface Segregation Principle
export interface ICourseService {
  getCourses(): Promise<ApiResponse<any[]>>;
  getCourse(id: number): Promise<ApiResponse<any>>;
  createCourse(data: any): Promise<ApiResponse<any>>;
}

export interface IUserService {
  getProfile(): Promise<ApiResponse<any>>;
  updateProfile(data: any): Promise<ApiResponse<any>>;
  getEnrollments(): Promise<ApiResponse<any[]>>;
}

export interface IPaymentService {
  createPaymentIntent(data: any): Promise<ApiResponse<any>>;
  getSubscription(): Promise<ApiResponse<any>>;
  createSubscription(data: any): Promise<ApiResponse<any>>;
}

export interface ILevelTestService {
  submitTest(answers: any[]): Promise<ApiResponse<any>>;
  getResults(userId: number): Promise<ApiResponse<any[]>>;
}

export interface IContactService {
  submitContact(data: any): Promise<ApiResponse<any>>;
}

// Concrete service implementations
export class CourseService implements ICourseService {
  async getCourses() {
    return apiClient.get<ApiResponse<any[]>>('/courses');
  }

  async getCourse(id: number) {
    return apiClient.get<ApiResponse<any>>(`/courses/${id}`);
  }

  async createCourse(data: any) {
    return apiClient.post<ApiResponse<any>>('/courses', data);
  }
}

export class UserService implements IUserService {
  async getProfile() {
    return apiClient.get<ApiResponse<any>>('/profile');
  }

  async updateProfile(data: any) {
    return apiClient.put<ApiResponse<any>>('/profile', data);
  }

  async getEnrollments() {
    return apiClient.get<ApiResponse<any[]>>('/enrollments');
  }
}

export class PaymentService implements IPaymentService {
  async createPaymentIntent(data: any) {
    return apiClient.post<ApiResponse<any>>('/create-payment-intent', data);
  }

  async getSubscription() {
    return apiClient.get<ApiResponse<any>>('/subscription');
  }

  async createSubscription(data: any) {
    return apiClient.post<ApiResponse<any>>('/create-subscription', data);
  }
}

export class LevelTestService implements ILevelTestService {
  async submitTest(answers: any[]) {
    return apiClient.post<ApiResponse<any>>('/level-test', { answers });
  }

  async getResults(userId: number) {
    return apiClient.get<ApiResponse<any[]>>(`/level-test/results/${userId}`);
  }
}

export class ContactService implements IContactService {
  async submitContact(data: any) {
    return apiClient.post<ApiResponse<any>>('/contact', data);
  }
}

// Service factory following Dependency Injection principle
export class ServiceFactory {
  private static courseService: ICourseService;
  private static userService: IUserService;
  private static paymentService: IPaymentService;
  private static levelTestService: ILevelTestService;
  private static contactService: IContactService;

  static getCourseService(): ICourseService {
    if (!this.courseService) {
      this.courseService = new CourseService();
    }
    return this.courseService;
  }

  static getUserService(): IUserService {
    if (!this.userService) {
      this.userService = new UserService();
    }
    return this.userService;
  }

  static getPaymentService(): IPaymentService {
    if (!this.paymentService) {
      this.paymentService = new PaymentService();
    }
    return this.paymentService;
  }

  static getLevelTestService(): ILevelTestService {
    if (!this.levelTestService) {
      this.levelTestService = new LevelTestService();
    }
    return this.levelTestService;
  }

  static getContactService(): IContactService {
    if (!this.contactService) {
      this.contactService = new ContactService();
    }
    return this.contactService;
  }
}
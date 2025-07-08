// Core domain types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
}

export interface Course {
  id: number;
  type: string;
  duration: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular: boolean | null;
}

export interface Enrollment {
  id: number;
  status: string;
  userId: number | null;
  courseId: number | null;
  startDate: Date | null;
  endDate: Date | null;
  paymentIntentId: string | null;
}

export interface Teacher {
  id: number;
  type: string;
  name: string;
  specialty: string;
  schedule: string;
  bio: string | null;
  imageUrl: string | null;
}

export interface Schedule {
  id: number;
  courseType: string;
  teacherId: number | null;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  zoomLink: string | null;
  topic?: string;
  level?: string;
}

export interface LevelTest {
  id: number;
  userId: number | null;
  level: string;
  score: number;
  completedAt: Date | null;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: Date | null;
}

// UI/Component specific types
export interface NavItem {
  href: string;
  label: string;
  icon: any;
  description: string;
  adminOnly?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

export interface Material {
  title: string;
  type: string;
  url: string;
  description: string;
}

export interface VideoRecording {
  title: string;
  date: string;
  duration: string;
  url: string;
  thumbnail: string;
  teacher: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export interface LevelTestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Achievement {
  name: string;
  icon: string;
  date: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  courseId: number;
  planDuration: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

// Configuration types
export interface ZoomConfig {
  accountId: string;
  clientId: string;
  clientSecret: string;
}

export interface YouTubeConfig {
  apiKey: string;
  playlistId: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Constants and enums
export enum CourseType {
  GENERAL = 'general',
  CEFR = 'cefr',
  COMBO = 'combo'
}

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PENDING = 'pending'
}

export enum UserLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}
// Application constants following Single Responsibility Principle

export const API_ENDPOINTS = {
  COURSES: '/api/courses',
  ENROLLMENTS: '/api/enrollments',
  PROFILE: '/api/profile',
  PAYMENT: '/api/create-payment-intent',
  SUBSCRIPTION: '/api/subscription',
  LEVEL_TEST: '/api/level-test',
  CONTACT: '/api/contact',
  TEACHERS: '/api/teachers',
  SCHEDULES: '/api/schedules',
} as const;

export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  LEVEL_TEST: '/level-test',
  CHECKOUT: '/checkout',
  COURSE_ACCESS: '/course-access',
  CONTACT: '/contact',
  ADMIN_SETTINGS: '/admin-settings',
  PROFILE: '/profile',
} as const;

export const QUERY_STALE_TIME = {
  SHORT: 1 * 60 * 1000,    // 1 minute
  MEDIUM: 5 * 60 * 1000,   // 5 minutes
  LONG: 30 * 60 * 1000,    // 30 minutes
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
  PHONE_MIN_LENGTH: 10,
} as const;

export const PRICING = {
  CURRENCY: 'THB',
  DISCOUNT_TIERS: {
    THREE_MONTHS: 0.1,   // 10%
    SIX_MONTHS: 0.2,     // 20%
  },
} as const;

export const COURSE_TYPES = {
  GENERAL: 'general',
  CEFR: 'cefr',
  COMBO: 'combo',
} as const;

export const ENROLLMENT_STATUSES = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const USER_LEVELS = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
} as const;

export const EXTERNAL_LINKS = {
  LINE: 'https://lin.ee/yOEjxmf',
  FACEBOOK: 'https://facebook.com/kruenglish',
  YOUTUBE: 'https://youtube.com/@kruenglish',
  TWITTER: 'https://twitter.com/kruenglish',
} as const;
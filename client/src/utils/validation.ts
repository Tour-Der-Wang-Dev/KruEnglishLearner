import { z } from 'zod';

// Reusable validation schemas following DRY principle
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const phoneSchema = z
  .string()
  .regex(/^[\+]?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''));

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .regex(/^[a-zA-Z\s\u0E00-\u0E7F]+$/, 'Name can only contain letters and spaces');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');

// Form validation schemas
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
});

export const checkoutFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: z
    .string()
    .regex(/^[\+]?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
  courseId: z.number().positive('Please select a course'),
  planDuration: z.string().min(1, 'Please select a plan duration')
});

export const profileFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema
});

export const levelTestSchema = z.object({
  answers: z.array(z.number().min(0).max(3)).min(1, 'Please answer at least one question')
});

// Validation utility functions
export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    return emailSchema.safeParse(email).success;
  }

  static isValidPhone(phone: string): boolean {
    return phoneSchema.safeParse(phone).success;
  }

  static validateForm<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: Record<string, string[]>;
  } {
    const result = schema.safeParse(data);
    
    if (result.success) {
      return { success: true, data: result.data };
    }

    const errors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    });

    return { success: false, errors };
  }

  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  static formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format Thai phone numbers
    if (digits.startsWith('66')) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
    } else if (digits.startsWith('0') && digits.length === 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    return phone;
  }
}

// Type guards for better type safety
export function isValidContactForm(data: unknown): data is z.infer<typeof contactFormSchema> {
  return contactFormSchema.safeParse(data).success;
}

export function isValidCheckoutForm(data: unknown): data is z.infer<typeof checkoutFormSchema> {
  return checkoutFormSchema.safeParse(data).success;
}

export function isValidProfileForm(data: unknown): data is z.infer<typeof profileFormSchema> {
  return profileFormSchema.safeParse(data).success;
}
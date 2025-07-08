import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

// Validation middleware following Single Responsibility Principle
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      
      req.body = result.data;
      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during validation'
      });
    }
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.query);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Query validation error',
          errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      
      req.query = result.data as any;
      next();
    } catch (error) {
      console.error('Query validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during validation'
      });
    }
  };
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.params);
      
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Parameter validation error',
          errors: result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      
      req.params = result.data as any;
      next();
    } catch (error) {
      console.error('Params validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during validation'
      });
    }
  };
}

// Common validation schemas
export const commonSchemas = {
  id: z.object({
    id: z.string().regex(/^\d+$/).transform(Number)
  }),
  
  pagination: z.object({
    page: z.string().optional().default('1').transform(Number),
    limit: z.string().optional().default('10').transform(Number),
  }),
  
  contact: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(10).max(1000)
  }),
  
  enrollment: z.object({
    courseId: z.number().positive(),
    planDuration: z.string().min(1),
    customerName: z.string().min(2).max(100),
    customerEmail: z.string().email(),
    customerPhone: z.string().optional()
  }),
  
  levelTest: z.object({
    answers: z.array(z.number().min(0).max(3)).min(1)
  })
};
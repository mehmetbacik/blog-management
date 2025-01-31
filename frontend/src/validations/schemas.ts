import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter and one number'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title is too long'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content is too long'),
  tags: z
    .array(z.string())
    .optional()
    .default([]),
  status: z.enum(['draft', 'pending', 'published'])
});

export const profileUpdateSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .optional(),
  email: z
    .string()
    .email('Invalid email format')
    .optional(),
  currentPassword: z
    .string()
    .min(6, 'Current password must be at least 6 characters')
    .optional(),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter and one number')
    .optional(),
}).refine((data: { newPassword?: string; currentPassword?: string }) => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required when setting new password",
  path: ["currentPassword"],
}); 
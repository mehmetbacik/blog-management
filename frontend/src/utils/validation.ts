import { z } from 'zod';

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment is too long')
});

export const validateComment = (data: unknown) => {
  return commentSchema.safeParse(data);
}; 
import { z } from 'zod';

export const ResponseSchema = z.object({
  message: z.string(),
});

export type Response = z.infer<typeof ResponseSchema>;

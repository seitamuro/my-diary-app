import { z } from 'zod';

export const UserInfoSchema = z.object({
  sub: z.string(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

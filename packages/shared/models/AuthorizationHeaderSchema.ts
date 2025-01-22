import { z } from '@hono/zod-openapi';

export const AuthorizationHeaderScheme = z.object({
  Authorization: z.string().openapi({
    description: 'idToken',
    example: '<idToken>',
  }),
});

export type AuthorizationHeader = z.infer<typeof AuthorizationHeaderScheme>;

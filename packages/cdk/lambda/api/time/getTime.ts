import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { ErrorResponseSchema, MessageSchema } from 'shared';

export const getTimeRoute = createRoute({
  path: '/',
  method: 'get',
  description: 'Returns the current time',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: MessageSchema,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
});

export const getTimeHandler: RouteHandler<typeof getTimeRoute, {}> = async (c) => {
  return c.json({ message: new Date().toISOString() });
};

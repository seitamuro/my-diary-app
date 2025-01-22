import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { ErrorResponseSchema, MessageSchema } from 'shared';

export const getHelloRoute = createRoute({
  path: '/',
  method: 'get',
  description: 'Returns a hello message',
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

export const getHelloHandler: RouteHandler<typeof getHelloRoute> = async (c) => {
  return c.json({ message: 'Hello, World!' });
};

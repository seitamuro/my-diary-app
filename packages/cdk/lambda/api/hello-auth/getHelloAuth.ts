import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { AuthorizationHeaderScheme, ErrorResponseSchema, MessageSchema } from 'shared';

export const getHelloAuthRoute = createRoute({
  path: '/',
  method: 'get',
  description: 'Returns a hello message',
  security: [{ Authorization: [] }],
  request: {
    headers: AuthorizationHeaderScheme,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: MessageSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
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

export const getHelloAuthHandler: RouteHandler<typeof getHelloAuthRoute, {}> = async (c) => {
  return c.json({ message: 'Hello, Authenticated World!' });
};

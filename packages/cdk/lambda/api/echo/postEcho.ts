import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { ErrorResponseSchema, MessageSchema } from 'shared';

export const postEchoRoute = createRoute({
  path: '/',
  method: 'post',
  description: 'Echoes the request body',
  request: {
    body: {
      content: {
        'application/json': {
          schema: MessageSchema,
        },
      },
    },
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

export const postEchoHandler: RouteHandler<typeof postEchoRoute, {}> = async (c) => {
  const body = await c.req.json();
  return c.json({ message: `You said: ${body.message}` });
};

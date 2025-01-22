import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { AuthorizationHeaderScheme, MessageSchema, UserInfoSchema } from 'shared';
import { Env } from '../../index';

export const getUserInfoRoute = createRoute({
  path: '/',
  method: 'get',
  security: [{ Authorization: [] }],
  request: {
    headers: AuthorizationHeaderScheme,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: UserInfoSchema,
        },
      },
    },
    401: {
      description: 'Unauthorized',
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
          schema: MessageSchema,
        },
      },
    },
  },
});

export const getUserInfoHandler: RouteHandler<typeof getUserInfoRoute, Env> = async (c) => {
  const payload = c.get('idTokenPayload');

  console.log(payload);

  return c.json(
    {
      sub: payload.sub,
    },
    200
  );
};

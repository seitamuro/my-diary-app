import { CognitoJwtVerifier } from 'aws-jwt-verify';
import type { MiddlewareHandler } from 'hono';

const USER_POOL_ID = process.env.USER_POOL_ID!;
const USER_POOL_CLIENT_ID = process.env.USER_POOL_CLIENT_ID!;

export const auth: MiddlewareHandler = async (c, next) => {
  const token = c.req.header('Authorization');
  if (!token) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId: USER_POOL_ID,
    tokenUse: 'id',
    clientId: USER_POOL_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(token);
    // @ts-ignore
    c.set('idTokenPayload', payload);
  } catch (e) {
    return c.json({ message: 'Unauthorized', reason: JSON.stringify(e) }, 401);
  }
  return next();
};

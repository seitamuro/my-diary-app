import { OpenAPIHono } from '@hono/zod-openapi';
import { auth } from '../../middlewares/auth';
import { getHelloAuthHandler, getHelloAuthRoute } from './getHelloAuth';

export const helloAuthApi = new OpenAPIHono();
helloAuthApi.use(auth);
helloAuthApi.openapi(getHelloAuthRoute, getHelloAuthHandler);

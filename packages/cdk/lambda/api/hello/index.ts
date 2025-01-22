import { OpenAPIHono } from '@hono/zod-openapi';
import { getHelloHandler, getHelloRoute } from './getHello';

export const helloApi = new OpenAPIHono();
helloApi.openapi(getHelloRoute, getHelloHandler);

import { OpenAPIHono } from '@hono/zod-openapi';
import { postEchoHandler, postEchoRoute } from './postEcho';

export const echoApi = new OpenAPIHono();
echoApi.openapi(postEchoRoute, postEchoHandler);

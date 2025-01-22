import { OpenAPIHono } from '@hono/zod-openapi';
import { getTimeHandler, getTimeRoute } from './getTime';

export const timeApi = new OpenAPIHono();
timeApi.openapi(getTimeRoute, getTimeHandler);

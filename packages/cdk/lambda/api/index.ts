import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { echoApi } from './echo';
import { helloApi } from './hello';
import { helloAuthApi } from './hello-auth';
import { timeApi } from './time';
import { userInfoApi } from './user-info';

export const api = new OpenAPIHono();

api.openAPIRegistry.registerComponent('securitySchemes', 'Authorization', {
  name: 'Authorization',
  in: 'header',
  type: 'apiKey',
  bearerFormat: 'JWT',
  description: 'idToken',
});

api
  .route('/hello', helloApi)
  .route('/hello-auth', helloAuthApi)
  .route('/time', timeApi)
  .route('/echo', echoApi)
  .route('/user-info', userInfoApi)
  .doc('/specification', {
    openapi: '3.0.3',
    info: {
      title: 'API',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api',
        description: 'API Server',
      },
    ],
  })
  .get(
    '/doc',
    swaggerUI({
      url: '/api/specification',
    })
  );

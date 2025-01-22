import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { api } from './api';

export type Env = {
  Variables: {
    idTokenPayload: CognitoIdTokenPayload;
  };
};

export const app = new Hono<Env>();

app.use('*', logger());
app.use('*', cors());

app.route('/api', api);

export const handler = handle(app);
